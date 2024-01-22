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
        if (error instanceof db.Sequelize.ValidationError) {
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
        .json(book);
        console.log(book)
}

exports.updateById = async (req, res) => {
    let result
    delete req.body.id
    try {
        result = await Book.update(req.body,{where: {id: req.params.id}})
    } catch (error) {
        console.log("BooksUpdate: ", error)
        res.status(500).send({error:"Something has gone wrong with the update"})
        return
    }
    if (result === 0) {
        res.status(404).send({error:"Book not found"})
        return
    }
    const book = await Book.findByPk(req.params.id)
    res.status(200)
    .location(`${getBaseUrl(req)}/books/${book.id}`)
    .json(book)
}

exports.deleteById = async (req, res) => {
    let result
    try {
        result = await Book.destroy({where: })
    } catch (error) {
        console.log("BooksDelete: ", error)
        res.status(500).send({error:"Something has gone wrong with the delete"})
        return
    }
    if (result === 0) {
        res.status(404).send({error:"Game not found"})
        return
    }
    res
    .status(204).send()
}

getBaseUrl = (request) => {
    return (
        (request.connection && request.connection.encryption ? "https" : "http") +
        `://${request.headers.host}`
    )
}