const app = require('express')()
const port = 8080
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./docs/swagger.json')

const books = [
    "Rikkaks saamise õpik",
    "Pride and Prejudice",
    "The Bear and The Nightingale",
    "1984",
    "Mockingjay",
    "Capitalist Realism",
    "Nine Perfect Strangers",
    "Rehepapp",
    "Kevade"
]
app.get('/books', (req, res) => {
    res.send(books)
})

app.get('/books/:id', (req, res) => {
    res.send(books[req.params.id])
})

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.listen(port, () => {
    console.log(`API up at: http://localhost:${port}`)
})