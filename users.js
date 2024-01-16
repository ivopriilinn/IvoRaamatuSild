require("dotenv").config()
const express = require('express')
const cors = require('cors')
const app = express()
const port = 8080
const swaggerUi = require('swagger-ui-express')
const yamljs = require('yamljs')
const swaggerDocument = yamljs.load('./docs/swagger.yaml')

app.use(cors())
app.use(express.json())

require("./routes/app_routes")(app)

//andmetabel users kohta
users = [
    {id: 1, firstName:"Tiit", lastName: "Kääpa", email: "tiitkaapa@desperado.org", phoneNumber: `"+37255123223"},
    {id: 2, firstName:"Teet", lastName: "Kääpa", email: "teetkaapa@desperado.org", phoneNumber: `"+37253987654"},
    {id: 3, firstName:"Heli", lastName: "Kopter", email: "helikopter@lennuakadeemia.eu", phoneNumber: `"+37251555666"},
    {id: 5, firstName:"Priit", lastName: "Priidik", email: "priitpriidik@priidu.com", phoneNumber: `"+37251555666"},
    {id: 6, firstName:"Heino", lastName: "Onu", email: "onuheino@johhaidii.nl", phoneNumber: `"+37251555666"},
    {id: 7, firstName:"Jüriarrak", lastName: "Park", email: "jyriarrakpark@hot.ee", phoneNumber: `"+37250007008"}
]

app.get('/users', (req, res) => {res.send(users)})


app.get('/users/:id', (req, res) => {
    if (typeof users[req.params.id - 1] === 'undefined') {
        return res.status(404).send({error: "User not found"})
    }
    res.send(users[req.params.id - 1])})

app.post('/users', (req, res) => {
    if (!req.body.firstName || !req.body.lastName || !req.body.email {
        return res.status(400).send({ error: "One or all parameters are missing" })
    }
    let book = ({
        id: users.length + 1,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber
    })
    books.push(user)
    res.status(201)
        .location(`${getBaseUrl(req)}/users/${users.length}`)
        .send(user)
})

app.delete('/users/:id', (req, res) => {
    if (typeof users[req.params.id - 1] === 'undefined') {
        return res.status(404).send({error: "user not found"})
    }

    users.splice(req.params.id - 1, 1)

    res.status(204).send({"No user found"})
})

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.listen(port, async () => {
    console.log(`API up at: http://localhost:${port}`)
})
function getBaseUrl(req) {
    return req.connection && req.connection.encrypted ? 'https' : 'http' + `://${req.headers.host}`
}