module.exports = (sequelize, Sequelize) => {
    const Book = sequelize.define("book", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: Sequelize.STRING,

        },
        author: {
            type: Sequelize.STRING,

        },
        year: {
            type: Sequelize.INTEGER,

        },
        pages: {
            type: Sequelize.INTEGER,

        }
    })

    return Book
}