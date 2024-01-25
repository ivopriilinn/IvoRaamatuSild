const { Sequelize } = require("sequelize")
const { db } = require("../../db");
const Users = db.users;

exports.getAll = async (req, res) => {
  const users = await Users.findAll({
    attributes: ["id", "firstName", "lastName", "email", "phoneNumber"],
  });
  res.send(users);
};

exports.getById = async (req, res) => {
  const user = await Users.findByPk(req.params.id);
  if (!user) {
    return res.status(404).send({ error: "User not found" });
  }
  res.send(user);
};

exports.createNew = async (req, res) => {
  try {
    const user = await Users.create(req.body);
    res.status(201).location(`${getBaseUrl(req)}/users/${user.id}`).json(user);
  } catch (error) {
    if (error instanceof db.Sequelize.ValidationError) {
      console.log(error);
      res
        .status(400)
        .send({ error: error.errors.map((item) => item.message) });
    } else {
      console.log("UsersCreate: ", error);
      res.status(500).send({ error: "Something has gone wrong" });
    }
  }
};

exports.updateById = async (req, res) => {
  try {
    const result = await Users.update(req.body, { where: { id: req.params.id } });
    if (result[0] === 0) {
      return res.status(404).send({ error: "User not found" });
    }
    const user = await Users.findByPk(req.params.id);
    res
      .status(200)
      .location(`${getBaseUrl(req)}/users/${user.id}`)
      .json(user);
  } catch (error) {
    console.log("UsersUpdate: ", error);
    res.status(500).send({ error: "Something has gone wrong with the update" });
  }
};

exports.deleteById = async (req, res) => {
  try {
    const result = await Users.destroy({ where: { id: req.params.id } });
    if (result === 0) {
      return res.status(404).send({ error: "User not found" });
    }
    res.status(204).send();
  } catch (error) {
    console.log("UsersDelete: ", error);
    res.status(500).send({ error: "Something has gone wrong with deleting the user" });
  }
};

const getBaseUrl = (request) => {
  return (
    (request.connection && request.connection.encryption ? "https" : "http") +
    `://${request.headers.host}`
  );
};
