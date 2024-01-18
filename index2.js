var express = require('express');
var app = express();

app.use(express.json());

books = [
    {id: 1, title:"Rikkaks saamise õpik. Kolmas täiendatud trükk", author: "Jaak Roosaare", year: 2018, pages: 416},
    {id: 2, title:"Pride and Prejudice", author: "Jane Austen", year: 2008, pages: 480},
    {id: 3, title:"The Bear and The Nightingale", author: "Katherine Arden", year: 2017, pages: 3014},
    {id: 4, title:"The Girl in the Tower", author: "Katherine Arden", year: 2018, pages: 360}
]

users = [
    {id: 7, firstName:"Tiit", lastName: "Kääpa", email: "tiitkaapa@desperado.org", phoneNumber: "+37255123223"},
    {id: 2, firstName:"Teet", lastName: "Kääpa", email: "teetkaapa@desperado.org", phoneNumber: "+37253987654"},
    {id: 3, firstName:"Heli", lastName: "Kopter", email: "helikopter@lennuakadeemia.eu", phoneNumber: "+37251555666"},
    {id: 8, firstName:"Priit", lastName: "Priidik", email: "priitpriidik@priidu.com", phoneNumber: "+37251555666"},
    {id: 6, firstName:"Heino", lastName: "Onu", email: "onuheino@johhaidii.nl", phoneNumber: "+37251555666"},
    {id: 10, firstName:"Jüriarrak", lastName: "Park", email: "jyriarrakpark@hot.ee", phoneNumber: "+37250007008"}
]

app.get('/users.html', function(req, res) {
  res.sendFile(__dirname + '/users.html');
});

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
            res.status(204).send()
            return
        }
    }
    return res.status(404).send({error: "User not found"})
})


app.post('/users', (req, res) => {
    if (!req.body.firstName || !req.body.lastName || !req.body.email) {
        return res.status(400).send({ error: "One or all parameters are missing" })
    }

//      // Ivo variant
//    var new_id = 1
//
//    for (let i = 1; i <= users.length+1; i++) {
//        for (let idx = 0; idx < users.length; idx++) {
//            if (users[idx].id != new_id) {
//                new_id =
//            }
//        }
//    }

//    // variant 1
//    var new_id
//    var i = 1
//    var is_ok
//    while (true) {
//        is_ok = true
//        for (let j = 0; j < users.length; j++) {
//            if (users[j].id == i) {
//                is_ok = false
//                break
//            }
//        }
//        if (is_ok) {
//            new_id = i
//            break
//        } else {
//            i++
//            continue
//        }
//    }

    // variant 2
    var new_id = -1
    var i = 1
    while (true) {
        j = users.findIndex(
            (user) => user.id == i
        )
        if (j == -1) {
            new_id = i
            break
        } else {
            i++
            continue
        }
    }

    let user = {
        id: new_id,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber
    }
    users.push(user)
    res.status(201)
        //.location(`${getBaseUrl(req)}/users/${users.length}`)
        .send()
})

var server = app.listen(8080, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)
})