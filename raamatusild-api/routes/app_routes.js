const bookController = require("../controllers/bookController")
const userController = require("../controllers/userController");

module.exports = (app) => {
    app.route("/books")
        .get(bookController.getAll)
        .post(bookController.createNew)

    app.route("/books/:id")
        .get(bookController.getById)
        .put(bookController.updateById)
        .delete(bookController.deleteById)

    // Users routing
    app.route("/users")
        .get(userController.getAll)
        
        
    app.route("/users/:id")
        .get(userController.getById)
}

