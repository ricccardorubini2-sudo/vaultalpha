<?php
// VaultAlpha crypto news feed.
//
//   GET /api/news.php           JSON list of the latest major crypto headlines.
//   php api/news.php refresh    Fetch the feeds now (for an optional hourly cron job).
//   php api/news.php json       Print the GET response (used by the Vite dev server).
//
// Headlines are collected from the RSS feeds of major crypto publications and
// kept only when the title reads as major news (see is_major_news). The SQLite
// store never holds more than NEWS_LIMIT items: every refresh deletes the
// oldest rows beyond the limit and the database reclaims the freed space.
//
// No cron job is required. A request that finds the data older than
// REFRESH_SECONDS gets the stored list immediately and the refresh runs after
// the response has been sent. An hourly cron job (`php .../api/news.php refresh`)
// keeps the list fresh even when nobody visits.
//
// Storage lives outside the web root when possible (VA_NEWS_DATA_DIR overrides),
// otherwise in api/data/ behind a deny-all .htaccess.

declare(strict_types=1);

const NEWS_LIMIT = 100;
const REFRESH_SECONDS = 3600;
const MAX_AGE_SECONDS = 7 * 86400;
const DUPLICATE_SIMILARITY = 0.5;
const FETCH_TIMEOUT_SECONDS = 12;
const USER_AGENT = 'VaultAlphaNews/1.0 (+https://vaultalpha.fund)';

const FEEDS = [
    'CoinDesk' => 'https://www.coindesk.com/arc/outboundfeeds/rss',
    'Cointelegraph' => 'https://cointelegraph.com/rss',
    'The Block' => 'https://www.theblock.co/rss.xml',
    'Decrypt' => 'https://decrypt.co/feed',
    'Bitcoin Magazine' => 'https://bitcoinmagazine.com/feed',
    'CryptoSlate' => 'https://cryptoslate.com/feed/',
];

// A headline is kept only when it is about crypto AND describes a major event.
const CRYPTO_PATTERN = '/\b(crypto\w*|bitcoin|btc|ether(eum)?|eth|solana|xrp|ripple|stablecoins?|usdc|usdt|tether|tokens?|tokeni[sz](ed|ation)|blockchain|defi|web3|nfts?|cbdcs?|digital assets?|etfs?|coinbase|binance|kraken|okx|bybit|ledger|wallets?|exchanges?|miners?|mining|celsius|ftx|on-?chain|altcoins?|dogecoin)\b/i';

const IMPACT_PATTERNS = [
    // Regulation and policy.
    '/\b(approv(e|es|ed|al)|ban(s|ned)?|bills?|laws?|legislation|regulat(ion|ions|or|ors|ory)|executive order|sanction(s|ed)?)\b/i',
    // Enforcement and courts.
    '/\b(lawsuits?|sues?|sued|charge[sd]?|indict(ed|ment)|arrest(ed|s)?|settlement|fined|guilty|sentenced|fraud|seiz(e|es|ed|ure)|freez(e|es)|frozen)\b/i',
    // Security incidents and failures.
    '/\b(hack(s|ed|er)?|exploit(s|ed)?|stolen|theft|drain(s|ed)?|breach|bankrupt(cy)?|collapses?|insolven(t|cy)|halts? withdrawals)\b/i',
    // Large market moves and flows.
    '/\b(record|all-time high|plunge[sd]?|crash(es|ed)?|surge[sd]?|soar(s|ed)?|tumble[sd]?|liquidat(ed|ions?)|outflows?|inflows?|worst|losses)\b/i',
    // Size.
    '/(\b(billion|trillion)\b|\$\d+(\.\d+)?\s?(b|bn|t)\b)/i',
    // Corporate milestones.
    '/\b(acquir(e|es|ed)|acquisition|merger|ipo|files? for|launch(es|ed)? spot|strategic reserve)\b/i',
];

// Routine or promotional content that is never shown.
const EXCLUDE_PATTERN = '/\b(price predictions?|price analysis|technical analysis|sponsored|press release|how to|what is|explained|guide|podcast|newsletter|giveaway|quiz|opinion|weekly recap|daily recap|morning minute|crypto biz|week ahead|digest)\b/i';

function is_major_news(string $title): bool
{
    if (preg_match(EXCLUDE_PATTERN, $title) || !preg_match(CRYPTO_PATTERN, $title)) {
        return false;
    }
    // Video and show episodes are titled as strings of exclamations.
    if (substr_count($title, '!') >= 2) {
        return false;
    }
    foreach (IMPACT_PATTERNS as $pattern) {
        if (preg_match($pattern, $title)) {
            return true;
        }
    }
    return false;
}

function data_dir(): string
{
    $candidates = array_filter([
        getenv('VA_NEWS_DATA_DIR') ?: null,
        dirname(__DIR__, 2) . '/vaultalpha-data',
    ]);
    foreach ($candidates as $dir) {
        if ((is_dir($dir) || @mkdir($dir, 0750, true)) && is_writable($dir)) {
            return $dir;
        }
    }
    $dir = __DIR__ . '/data';
    if (!is_dir($dir) && !mkdir($dir, 0750, true)) {
        throw new RuntimeException('News data directory is not writable');
    }
    if (!is_file($dir . '/.htaccess')) {
        file_put_contents($dir . '/.htaccess', "Require all denied\nDeny from all\n");
    }
    return $dir;
}

function open_db(string $dir): PDO
{
    $path = $dir . '/news.sqlite';
    $isNew = !is_file($path);
    $db = new PDO('sqlite:' . $path, null, null, [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]);
    $db->exec('PRAGMA busy_timeout = 5000');
    if ($isNew) {
        // Must be set before the first table exists; deleted rows then free disk space.
        $db->exec('PRAGMA auto_vacuum = FULL');
    }
    $db->exec('CREATE TABLE IF NOT EXISTS news (
        id INTEGER PRIMARY KEY,
        url TEXT NOT NULL UNIQUE,
        title_key TEXT NOT NULL UNIQUE,
        title TEXT NOT NULL,
        source TEXT NOT NULL,
        published_at INTEGER NOT NULL,
        fetched_at INTEGER NOT NULL
    )');
    $db->exec('CREATE INDEX IF NOT EXISTS news_published ON news (published_at DESC)');
    $db->exec('CREATE TABLE IF NOT EXISTS meta (k TEXT PRIMARY KEY, v TEXT NOT NULL)');
    return $db;
}

function meta_get(PDO $db, string $key): ?string
{
    $stmt = $db->prepare('SELECT v FROM meta WHERE k = ?');
    $stmt->execute([$key]);
    $value = $stmt->fetchColumn();
    return $value === false ? null : (string) $value;
}

function meta_set(PDO $db, string $key, string $value): void
{
    $db->prepare('INSERT INTO meta (k, v) VALUES (?, ?) ON CONFLICT(k) DO UPDATE SET v = excluded.v')
        ->execute([$key, $value]);
}

function fetch_feeds(): array
{
    $multi = curl_multi_init();
    $handles = [];
    foreach (FEEDS as $source => $url) {
        $ch = curl_init($url);
        curl_setopt_array($ch, [
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_MAXREDIRS => 3,
            CURLOPT_CONNECTTIMEOUT => 6,
            CURLOPT_TIMEOUT => FETCH_TIMEOUT_SECONDS,
            CURLOPT_USERAGENT => USER_AGENT,
            CURLOPT_ENCODING => '',
            CURLOPT_PROTOCOLS => CURLPROTO_HTTPS,
            CURLOPT_HTTPHEADER => ['Accept: application/rss+xml, application/xml, text/xml'],
        ]);
        curl_multi_add_handle($multi, $ch);
        $handles[$source] = $ch;
    }
    do {
        $status = curl_multi_exec($multi, $running);
        if ($running) {
            curl_multi_select($multi, 1.0);
        }
    } while ($running && $status === CURLM_OK);

    $errors = [];
    while ($info = curl_multi_info_read($multi)) {
        if ($info['result'] !== CURLE_OK) {
            $errors[spl_object_id($info['handle'])] = curl_strerror($info['result']);
        }
    }

    $bodies = [];
    foreach ($handles as $source => $ch) {
        $code = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);
        $body = curl_multi_getcontent($ch);
        if ($code === 200 && is_string($body) && $body !== '') {
            $bodies[$source] = $body;
        } else {
            error_log("[news] {$source}: HTTP {$code} " . ($errors[spl_object_id($ch)] ?? ''));
        }
        curl_multi_remove_handle($multi, $ch);
        curl_close($ch);
    }
    curl_multi_close($multi);
    return $bodies;
}

function clean_text(string $text): string
{
    $text = html_entity_decode(strip_tags($text), ENT_QUOTES | ENT_HTML5, 'UTF-8');
    $text = trim(preg_replace('/\s+/u', ' ', $text) ?? '');
    return mb_substr($text, 0, 300);
}

function clean_url(string $url): ?string
{
    $url = trim($url);
    if (!filter_var($url, FILTER_VALIDATE_URL) || !preg_match('#^https?://#i', $url)) {
        return null;
    }
    $parts = parse_url($url);
    if (!empty($parts['query'])) {
        parse_str($parts['query'], $query);
        $query = array_filter($query, fn ($key) => !preg_match('/^utm_/i', (string) $key), ARRAY_FILTER_USE_KEY);
        $base = strtok($url, '?');
        $url = $query ? $base . '?' . http_build_query($query) : $base;
    }
    return mb_substr($url, 0, 1000);
}

function parse_feed(string $source, string $body): array
{
    libxml_use_internal_errors(true);
    $xml = simplexml_load_string($body, 'SimpleXMLElement', LIBXML_NOCDATA | LIBXML_NONET);
    if ($xml === false) {
        error_log("[news] {$source}: invalid XML");
        return [];
    }
    $entries = isset($xml->channel->item) ? $xml->channel->item : ($xml->entry ?? []);
    $now = time();
    $items = [];
    foreach ($entries as $entry) {
        $title = clean_text((string) $entry->title);
        $link = (string) $entry->link;
        if ($link === '' && isset($entry->link['href'])) {
            $link = (string) $entry->link['href'];
        }
        $url = clean_url($link);
        if ($title === '' || $url === null) {
            continue;
        }
        $date = (string) ($entry->pubDate ?? '')
            ?: (string) ($entry->children('http://purl.org/dc/elements/1.1/')->date ?? '')
            ?: (string) ($entry->published ?? $entry->updated ?? '');
        $published = strtotime($date) ?: $now;
        $items[] = [
            'title' => $title,
            'url' => $url,
            'source' => $source,
            'published_at' => min($published, $now),
        ];
    }
    return $items;
}

function title_key(string $title): string
{
    $key = preg_replace('/[^a-z0-9]+/', ' ', strtolower($title)) ?? '';
    return mb_substr(trim($key), 0, 80);
}

const COMMON_WORDS = ['from', 'with', 'this', 'that', 'says', 'said', 'after', 'into', 'over', 'amid', 'will', 'than', 'more', 'about'];

function title_words(string $title): array
{
    $words = preg_split('/[^a-z0-9]+/', strtolower($title), -1, PREG_SPLIT_NO_EMPTY) ?: [];
    $words = array_filter($words, fn ($w) => strlen($w) >= 4 && !in_array($w, COMMON_WORDS, true));
    return array_values(array_unique($words));
}

// The same story from several outlets: most significant words shared.
function is_same_story(array $a, array $b): bool
{
    $union = count(array_unique(array_merge($a, $b)));
    return $union > 0 && count(array_intersect($a, $b)) / $union >= DUPLICATE_SIMILARITY;
}

function refresh(string $dir, PDO $db, bool $force = false): array
{
    $lock = fopen($dir . '/refresh.lock', 'c');
    if (!$lock || !flock($lock, LOCK_EX | LOCK_NB)) {
        return ['skipped' => 'another refresh is running'];
    }
    try {
        $lastAttempt = (int) (meta_get($db, 'last_attempt') ?? 0);
        if (!$force && time() - $lastAttempt < REFRESH_SECONDS) {
            return ['skipped' => 'fresh'];
        }
        meta_set($db, 'last_attempt', (string) time());

        $bodies = fetch_feeds();
        $insert = $db->prepare('INSERT OR IGNORE INTO news (url, title_key, title, source, published_at, fetched_at)
            VALUES (?, ?, ?, ?, ?, ?)');
        $cutoff = time() - MAX_AGE_SECONDS;
        $known = array_map('title_words', $db->query('SELECT title FROM news WHERE published_at >= ' . $cutoff)->fetchAll(PDO::FETCH_COLUMN));
        $seen = 0;
        $added = 0;
        $db->beginTransaction();
        foreach ($bodies as $source => $body) {
            foreach (parse_feed($source, $body) as $item) {
                $seen++;
                if ($item['published_at'] < $cutoff || !is_major_news($item['title'])) {
                    continue;
                }
                $words = title_words($item['title']);
                foreach ($known as $other) {
                    if (is_same_story($words, $other)) {
                        continue 2;
                    }
                }
                $insert->execute([$item['url'], title_key($item['title']), $item['title'], $item['source'], $item['published_at'], time()]);
                if ($insert->rowCount() > 0) {
                    $added++;
                    $known[] = $words;
                }
            }
        }
        $removed = $db->exec('DELETE FROM news WHERE id NOT IN (
            SELECT id FROM news ORDER BY published_at DESC, id DESC LIMIT ' . NEWS_LIMIT . '
        )');
        if ($bodies) {
            meta_set($db, 'updated_at', (string) time());
        }
        $db->commit();
        return ['feeds' => count($bodies), 'seen' => $seen, 'added' => $added, 'removed' => $removed];
    } catch (Throwable $e) {
        if ($db->inTransaction()) {
            $db->rollBack();
        }
        throw $e;
    } finally {
        flock($lock, LOCK_UN);
        fclose($lock);
    }
}

function list_news(PDO $db): array
{
    $rows = $db->query('SELECT title, url, source, published_at FROM news
        ORDER BY published_at DESC, id DESC LIMIT ' . NEWS_LIMIT)->fetchAll(PDO::FETCH_ASSOC);
    return array_map(fn ($row) => [
        'title' => $row['title'],
        'url' => $row['url'],
        'source' => $row['source'],
        'publishedAt' => gmdate('c', (int) $row['published_at']),
    ], $rows);
}

function send_json(int $status, array $payload, int $maxAge = 0): void
{
    $body = json_encode($payload, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    header('X-Content-Type-Options: nosniff');
    header('X-Robots-Tag: noindex');
    header('Cache-Control: ' . ($maxAge > 0 ? "public, max-age={$maxAge}" : 'no-store'));
    header('Content-Length: ' . strlen($body));
    header('Connection: close');
    echo $body;
}

function finish_response(): void
{
    if (function_exists('fastcgi_finish_request')) {
        fastcgi_finish_request();
    } elseif (function_exists('litespeed_finish_request')) {
        litespeed_finish_request();
    } else {
        while (ob_get_level() > 0) {
            ob_end_flush();
        }
        flush();
    }
}

function news_payload(PDO $db): array
{
    $updatedAt = (int) (meta_get($db, 'updated_at') ?? 0);
    return [
        'updatedAt' => $updatedAt ? gmdate('c', $updatedAt) : null,
        'items' => list_news($db),
    ];
}

if (PHP_SAPI === 'cli') {
    $dir = data_dir();
    $db = open_db($dir);
    $mode = $argv[1] ?? '';
    if ($mode === 'json') {
        // Used by the Vite dev server, which cannot run PHP over HTTP.
        refresh($dir, $db);
        echo json_encode(news_payload($db), JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
        exit(0);
    }
    echo json_encode(refresh($dir, $db, $mode === 'refresh')), PHP_EOL;
    exit(0);
}

if (!in_array($_SERVER['REQUEST_METHOD'] ?? 'GET', ['GET', 'HEAD'], true)) {
    header('Allow: GET, HEAD');
    send_json(405, ['error' => 'Method not allowed']);
    exit;
}

try {
    $dir = data_dir();
    $db = open_db($dir);
    $stale = time() - (int) (meta_get($db, 'last_attempt') ?? 0) >= REFRESH_SECONDS;
    $empty = (int) $db->query('SELECT COUNT(*) FROM news')->fetchColumn() === 0;

    if ($stale && $empty) {
        refresh($dir, $db);
    }
    send_json(200, news_payload($db), 300);

    if ($stale && !$empty) {
        ignore_user_abort(true);
        set_time_limit(60);
        finish_response();
        refresh($dir, $db);
    }
} catch (Throwable $e) {
    error_log('[news] ' . $e->getMessage());
    if (!headers_sent()) {
        send_json(503, ['error' => 'News is temporarily unavailable']);
    }
}
