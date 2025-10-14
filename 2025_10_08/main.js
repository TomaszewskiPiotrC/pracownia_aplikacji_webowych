const http = require('http');
const fs = require('fs').promises;
const path = require('path');
const url = require('url');
const mime = require('mime-types');

const server = http.createServer(async (req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;

    switch(pathname){
        case '/':
            res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
            res.end('Strona główna');
            break;
        case '/main':
            res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
            res.end('Strona główna');
            break;
        case '/json':
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                message: 'Hello world!',
            }, null, 2));
            break;
        case '/html':
            const html = `
                  <!DOCTYPE html>
                  <html lang="pl">
                    <head>
                        <meta charset="utf-8">
                        <title>Strona</title>
                    </head>
                    <body>
                        <h1>Strona HTML</h1>
                    </body>
                  </html>
                `
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end(html);
            break;
        case '/file':
            const filePath = path.join(__dirname, 'index.html');
            const file = await fs.readFile(filePath, 'utf8');
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end(file);
            break;
        case '/get_params':
            const queryParams = parsedUrl.query;
            console.log('Parametry GET:', queryParams);
            const paramsArray = Object.entries(queryParams).map(([key, value]) => ({
                key,
                value
            }));
            const timestamp = Date.now();
            const filename = `params_${timestamp}.json`;
            try {
                await fs.writeFile(filename, JSON.stringify(paramsArray, null, 2));
                console.log(`Parametry zapisane do pliku: ${filename}`);
            } catch (error) {
                console.error('Błąd zapisu:', error);
            }
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ ok: 'ok' }));
            break;
        default:
            try {
                const assetsPath = path.join(__dirname, 'assets');
                const filePath = path.join(assetsPath, pathname.substring(1));
                if (!filePath.startsWith(assetsPath)) {
                    throw new Error('Access denied');
                }
                const fileContent = await fs.readFile(filePath);
                const mimeType = mime.lookup(filePath) || 'application/octet-stream';
                res.writeHead(200, {
                    'Content-Type': mimeType,
                    'Content-Length': fileContent.length
                });
                res.end(fileContent);
            } catch (error) {
                res.writeHead(404, {
                    'Content-Type': 'application/json; charset=utf-8'
                });
                res.end(JSON.stringify({
                    error: 'Not Found',
                }, null, 2));
            }
            break;
    }
});

server.listen(3000, () => {
    console.log(`Server running on http://localhost:3000`);
});