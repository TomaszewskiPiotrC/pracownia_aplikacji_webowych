const express = require('express')
const path = require('path')
const {promises: fs} = require('fs')
const app = express()

app.use(express.urlencoded({ extended: true }))
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

    res.redirect('/')
})

app.listen(3000, () => {
    console.log('App is running on http://localhost:3000')
})