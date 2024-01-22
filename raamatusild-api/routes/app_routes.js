const bookController = require("../controllers/bookController")

module.exports = (app) => {
    app.route("/books")
        .get(bookController.getAll)
        .post(bookController.createNew)

    app.route("/books/:id")
        .get(bookController.getById)
        .put(bookController.updateById)
        .delete(bookController.deleteById)

}

