// Crypto news panel. Headlines are collected hourly on the server by
// public/api/news.php, which keeps at most 100 items. Keep NEWS_SOURCES in
// step with FEEDS in that file.
export const NEWS_ENDPOINT = '/api/news.php';

export const NEWS_SOURCES = ['CoinDesk', 'Cointelegraph', 'The Block', 'Decrypt', 'Bitcoin Magazine', 'CryptoSlate'];

export const NEWS_DISCLAIMER =
    'Headlines are collected automatically from third-party publishers. We do not write, verify or endorse them, and nothing here is investment advice.';
