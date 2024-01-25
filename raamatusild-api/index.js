require("dotenv").config()
const express = require('express')
const cors = require('cors')
const app = express()
const port = 8080
const swaggerUi = require('swagger-ui-express')
const yamljs = require('yamljs')
const swaggerDocument = yamljs.load('./docs/swagger.yaml')

app.use(cors())
app.use(express.json())

require("./routes/app_routes")(app)

/*
const books = [
    {id: 1, title:"Rikkaks saamise õpik. Kolmas täiendatud trükk", author: "Jaak Roosaare", year: 2018, pages: 416},
    {id: 2, title:"Pride and Prejudice", author: "Jane Austen", year: 2008, pages: 480},
    {id: 3, title:"The Bear and The Nightingale", author: "Katherine Arden", year: 2017, pages: 3014},
    {id: 4, title:"The Girl in the Tower", author: "Katherine Arden", year: 2018, pages: 360}
]
app.get('/books', (req, res) => {
    res.send(books)
})

app.get('/books/:id', (req, res) => {

    if (typeof books[req.params.id - 1] === 'undefined') {
        return res.status(404).send({error: "Book not found"})
    }
    res.send(books[req.params.id - 1])
})

app.post('/books', (req, res) => {
    if (!req.body.title || !req.body.author || !req.body.year || !req.body.pages) {
        return res.status(400).send({ error: "One or all parameters are missing" })
    }

    let book = ({
        id: books.length + 1,
        title: req.body.title,
        author: req.body.author,
        year: req.body.year,
        pages: req.body.pages
    })

    books.push(book)

    res.status(201)
        .location(`${getBaseUrl(req)}/books/${books.length}`)
        .send(book)
})

app.delete('/books/:id', (req, res) => {
    if (typeof books[req.params.id - 1] === 'undefined') {
        return res.status(404).send({error: "Book not found"})
    }

    books.splice(req.params.id - 1, 1)

    res.status(204).send({error: "No content"})
})
*/

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.listen(port, async () => {
    console.log(`API up at: http://localhost:${port}`)
})

function getBaseUrl(req) {
    return req.connection && req.connection.encrypted ? 'https' : 'http' + `://${req.headers.host}`
}