const { Sequelize } = require("sequelize")
const {db} = require("../../db")
const Book = db.books

exports.getAll = async (req, res) => {
    const books = await Book.findAll({attributes:["id","title", "author", "year", "pages"]})
    res.send(books)
}

exports.getById = async (req, res) => {
    const books = await Book.findByPk(req.params.id)
    res.send(books)
}

exports.createNew = async (req, res) => {
    let book

    console.log("Received Data:", req.body);

    try {
        book = await Book.create(req.body)
    } catch (error) {
        if (error instanceof Sequelize.ValidationError) {
            console.log(error)
            res.status(400).send({"error":error.errors.map((item) => 
            item.message)})
        } else {
            console.log("BooksCreate: ", error)
            res.status(500).send({"error":"Something has gone wrong"})
        }
        return
    }
    res
        .status(201)
        .location(`${getBaseUrl(req)}/books/${book.id}`)
        .json(book)
        console.log(book)
}

getBaseUrl = (request) => {
    return (
        (request.connection && request.connection.encryption ? "https" : "http") +
        `://${request.headers.host}`
    )
}