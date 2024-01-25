module.exports = (sequelize, Sequelize) => {
    const Users = sequelize.define("users", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        firstName: {
            type: Sequelize.STRING,

        },
        lastName: {
            type: Sequelize.STRING,

        },
        email: {
            type: Sequelize.STRING,

        },
        phoneNumber: {
            type: Sequelize.STRING,

        }
    })

    return Users
}