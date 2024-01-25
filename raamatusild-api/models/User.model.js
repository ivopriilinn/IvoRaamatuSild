module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        first_name: {
            type: Sequelize.STRING,

        },
        last_name: {
            type: Sequelize.STRING,

        },
        email: {
            type: Sequelize.STRING,

        },
        telephone: {
            type: Sequelize.STRING,

        }
    })

    return User
}