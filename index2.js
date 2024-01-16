var express = require('express');
var app = express();

users = [
    {id: 1, firstName:"Tiit", lastName: "Kääpa", email: "tiitkaapa@desperado.org", phoneNumber: "+37255123223"},
    {id: 2, firstName:"Teet", lastName: "Kääpa", email: "teetkaapa@desperado.org", phoneNumber: "+37253987654"},
    {id: 3, firstName:"Heli", lastName: "Kopter", email: "helikopter@lennuakadeemia.eu", phoneNumber: "+37251555666"},
    {id: 5, firstName:"Priit", lastName: "Priidik", email: "priitpriidik@priidu.com", phoneNumber: "+37251555666"},
    {id: 6, firstName:"Heino", lastName: "Onu", email: "onuheino@johhaidii.nl", phoneNumber: "+37251555666"},
    {id: 7, firstName:"Jüriarrak", lastName: "Park", email: "jyriarrakpark@hot.ee", phoneNumber: "+37250007008"}
]

app.get('/users', (req, res) => {res.send(users)})

app.get('/users/:id', (req, res) => {
    for (let i = 0; i < users.length; i++) {
        //console.log(users[i].id)
        if (users[i].id == req.params.id) {
            res.send(users[i])
            return
        }
    }
    return res.status(404).send({error: "User not found"})
})

app.delete('/users/:id', (req, res) => {
    for (let i = 0; i < users.length; i++) {
        //console.log(users[i].id)
        if (users[i].id == req.params.id) {
            users.splice(i,1)
            res.status(204).send({message: "User deleted"})
            return
        }
    }
    return res.status(404).send({error: "User not found"})
})

var server = app.listen(8080, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)
})