const bookController = require("../controllers/bookController")
const userController = require("../controllers/userController")

// books routing
module.exports = (app) => {
    app.route("/books")
        .get(bookController.getAll)
        .post(bookController.createNew)

    app.route("/books/:id")
        .get(bookController.getById)
        .put(bookController.updateById)
        .delete(bookController.deleteById)

}

//users routing
module.exports = (app) => {
    app.route("/users")
        .get(userController.getAll)
        .post(userController.createNew)

    app.route("/users/:id")
        .get(userController.getById)
        .put(userController.updateById)
        .delete(userController.deleteById)

}
