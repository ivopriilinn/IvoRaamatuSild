const {db} = require("../db")
const Book = db.books

exports.getAll = async (req, res) => {
    const books = await Book.findAll({attributes:["title"]})
    res.send(books)
}