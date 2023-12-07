const app = require('express')()
const port = 8080
const swaggerUi = require('swagger-ui-express')
const yamljs = require('yamljs')
const swaggerDocument = yamljs.load('./docs/swagger.yaml')

const books = [
    {id: 1, name:"Rikkaks saamise õpik. Kolmas täiendatud trükk", author: "Jaak Roosaare", year: 2018, pages: 416},
    {id: 2, name:"Pride and Prejudice", author: "Jane Austen", year: 2008, pages: 480},
    {id: 3, name:"The Bear and The Nightingale", author: "Katherine Arden", year: 2017, pages: 3014}
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

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.listen(port, () => {
    console.log(`API up at: http://localhost:${port}`)
})