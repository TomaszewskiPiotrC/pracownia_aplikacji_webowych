const http = require('http');
const fs = require('fs').promises;
const path = require('path');

const server = http.createServer(async (req, res) => {
    switch(req.url){
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
        default:
            res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
            res.end("Not Found!");
            break;
    }
});
server.listen(3000, () => {
    console.log(`Server running on http://localhost:3000`);
});