const { Sequelize } = require("sequelize")
const {db} = require("../../db")
const Users = db.users

exports.getAll = async (req, res) => {
    const users = await Users.findAll({attributes:["id","firstName", "lastName", "email", "phoneNumber"]})
    res.send(users)
}

exports.getById = async (req, res) => {
    const users = await Users.findByPk(req.params.id)
    res.send(users)
}

exports.createNew = async (req, res) => {
    let user

    console.log("Received Data:", req.body);

    try {
        user = await Users.create(req.body)
    } catch (error) {
        if (error instanceof db.Sequelize.ValidationError) {
            console.log(error)
            res.status(400).send({"error":error.errors.map((item) =>
            item.message)})
        } else {
            console.log("UsersCreate: ", error)
            res.status(500).send({"error":"Something has gone wrong"})
        }
        return
    }
    res
        .status(201)
        .location(`${getBaseUrl(req)}/users/${user.id}`)
        .json(user);
        console.log(user)
}

exports.updateById = async (req, res) => {
    let result
    delete req.body.id
    try {
        result = await Users.update(req.body,{where: {id: req.params.id}})
    } catch (error) {
        console.log("UsersUpdate: ", error)
        res.status(500).send({error:"Something has gone wrong with the update"})
        return
    }
    if (result === 0) {
        res.status(404).send({error:"User not found"})
        return
    }
    const user = await Users.findByPk(req.params.id)
    res.status(200)
    .location(`${getBaseUrl(req)}/users/${user.id}`)
    .json(user)
}

exports.deleteById = async (req, res) => {
    let result
    try {
        result = await Users.destroy({where: {id: req.params.id}})
    } catch (error) {
        console.log("UsersDelete: ", error)
        res.status(500).send({error:"Something has gone wrong with deleting the user"})
        return
    }
    if (result === 0) {
        res.status(404).send({error:"User not found"})
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