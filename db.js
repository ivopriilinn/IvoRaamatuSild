require("dotenv").config()

const Sequelize = require('sequelize');
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: process.env.DB_HOST,
        dialect: "mariadb",
        define: {
            timestamps: false
        }
    }
)

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.books = require("./raamatusild-api/models/Book.model")(sequelize, Sequelize);
db.users = require("./raamatusild-api/models/Users.model")(sequelize, Sequelize);
async function Sync() {
    await sequelize.sync({alter:true})
}

//async function Sync() {
//    await sequelize.sync({alter:true})
//}

module.exports = { db, Sync };