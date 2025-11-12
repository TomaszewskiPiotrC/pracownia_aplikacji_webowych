const express = require('express')
const path = require('path')
const {promises: fs} = require('fs')
const mysql = require('mysql2')
const app = express()

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'messages'
})

db.connect((err) => {
    if (err) {
        console.error('Błąd połączenia z bazą danych:', err)
        return
    }
    console.log('Połączono z bazą danych MySQL')})

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static('static'))
app.use(express.static('html'))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'html/main.html'))
})
app.get('/o-nas', (req, res) => {
    res.sendFile(path.join(__dirname, 'html/about.html'))
})
app.get('/oferta', (req, res) => {
    res.sendFile(path.join(__dirname, 'html/oferta.html'))
})
app.get('/kontakt', (req, res) => {
    res.sendFile(path.join(__dirname, 'html/kontakt.html'))
})

app.post('/kontakt', (req, res) => {
    console.log('Dane z formularza:')
    console.log('Imię:', req.body.name)
    console.log('Nazwisko:', req.body.surname)
    console.log('Email:', req.body.email)
    console.log('Wiadomość:', req.body.message)

    const insertQuery = 'INSERT INTO messages (name, surname, email, content) VALUES (?, ?, ?, ?)'

    db.query(insertQuery, [req.body.name, req.body.surname, req.body.email, req.body.message], (err, result) => {
        if (err) {
            console.error('Błąd zapisu do bazy danych:', err)
        }
    })

    res.redirect('http://localhost:3000/')
})

app.get('/api/contact-messages', (req, res) => {
    const query = 'SELECT * FROM messages'

    db.query(query, (err, results) => {
        if (err) {
            console.error('Błąd pobierania wiadomości:', err)
            return res.status(500).json({ error: 'Błąd serwera' })
        }

        res.json(results)
    })
})

app.get('/api/contact-messages/:id', (req, res) => {
    const messageId = req.params.id

    if (isNaN(messageId)) {
        return res.status(400).json({ error: 'Nieprawidłowy format ID' })
    }

    const query = 'SELECT * FROM messages WHERE id = ?'

    db.query(query, [messageId], (err, results) => {
        if (err) {
            console.error('Błąd pobierania wiadomości:', err)
            return res.status(500).json({ error: 'Błąd serwera' })
        }

        if (results.length === 0) {
            return res.status(404).json({ error: 'Wiadomość nie znaleziona' })
        }

        res.json(results[0])
    })
})

app.listen(3000, () => {
    console.log('App is running on http://localhost:3000')
})