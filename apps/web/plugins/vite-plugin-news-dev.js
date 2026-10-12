// Dev only: the Vite dev server cannot execute PHP, so /api/news.php is
// answered by running public/api/news.php with the PHP command-line binary.
//
// The binary is VA_PHP (from the environment or apps/web/.env.local), or `php`
// on PATH. It needs the curl, pdo_sqlite and mbstring extensions and, on
// Windows, `curl.cainfo` pointing at a CA bundle.
import { execFile } from 'node:child_process';
import os from 'node:os';
import path from 'node:path';
import { loadEnv } from 'vite';

const SCRIPT = path.resolve(import.meta.dirname, '../public/api/news.php');
const DATA_DIR = path.join(os.tmpdir(), 'vaultalpha-news-dev');

export default function newsDevPlugin() {
    return {
        name: 'vaultalpha-news-dev',
        apply: 'serve',
        configureServer(server) {
            const env = loadEnv(server.config.mode, server.config.envDir || server.config.root, '');
            const php = process.env.VA_PHP || env.VA_PHP || 'php';
            let warned = false;

            server.middlewares.use('/api/news.php', (req, res) => {
                execFile(
                    php,
                    [SCRIPT, 'json'],
                    { env: { ...process.env, VA_NEWS_DATA_DIR: DATA_DIR }, timeout: 60_000, maxBuffer: 5 * 1024 * 1024 },
                    (error, stdout) => {
                        res.setHeader('Content-Type', 'application/json; charset=utf-8');
                        res.setHeader('Cache-Control', 'no-store');
                        if (error || !stdout.trim().startsWith('{')) {
                            if (!warned) {
                                warned = true;
                                server.config.logger.warn(
                                    `[news] Could not run "${php}" for /api/news.php (${error?.code ?? 'no JSON output'}). ` +
                                        'Install PHP 8 with curl, pdo_sqlite and mbstring, or set VA_PHP in apps/web/.env.local.',
                                );
                            }
                            res.statusCode = 503;
                            res.end(JSON.stringify({ error: 'News is temporarily unavailable' }));
                            return;
                        }
                        res.end(stdout);
                    },
                );
            });
        },
    };
}
