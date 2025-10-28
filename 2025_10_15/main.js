const express = require('express')
const path = require('path');
const {promises: fs} = require("fs");
const app = express()
const port = 3000
app.get('/', (req, res) => {
    res.send('Strona główna')
})
app.get('/main', (req, res) => {
    res.send('Strona główna')
})
app.get('/json', (req, res) => {
    res.json({
        message: 'Hello world!'
    })
})
app.get('/html', (req, res) => {
    res.send('<h1>Strona HTML</h1>')
})
app.get('/file', (req, res) => {
    res.sendFile(__dirname+'/index.html')
})
app.get('/get_params', async (req, res) => {
    console.log('Parametry GET:', req.query);
    const paramsArray = Object.entries(req.query).map(([key, value]) => ({
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
    res.json({ ok: 'ok' });
})
app.use(express.static(__dirname+'/assets'))
app.all('*', (req, res) => {
    res.status(404).json({error: 'Not found'})
});
app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})