var express = require('express')
var app = express()
var ip = require('ip')
var path = require('path')
var fs = require('fs')

var database = require('./mysql_connection')
var db = new database.db ()

var port = process.env.PORT || 8080

var router = express.Router()

app.set('view engine', 'ejs')

// Allows us to parse POST request data
var bodyParser = require('body-parser')
app.use(bodyParser.json());

// On use of any request
router.use(function(req, res, next) {
    var ip = req.headers['x-real-ip'] || req.connection.remoteAddress;
    console.log("\nNew " + req.method + " request from " + ip)
    console.log(req.originalUrl)
    next()
})

// All file are served from the /src directory
__dirname = __dirname + "/src"

// Redirect favicon to the resources file
router.get('/favicon.ico', (req, res) => {
    res.sendFile(path.join(__dirname + '/resources/favicon.ico'))
})

router.get("/points", (req, res) => {
    // db.all_users((users) => {
    users = [{name: "Richard"}, {name: "Rick"}, {name: "Dick"}]
    tasks = [
        {
            point: 1,
            names: ["eat fruit", "eat veggies"]
        },
        {
            point: 10,
            names: ["go the gym", "read the newspaper", "do your homework"]
        },
        {
            point: 5,
            names: ["ride a bike to work", "do PALOTOIES"]
        },
        {
            point: 100,
            names: ["wash dave's car"]
        }
    ]
    res.render("points", {users: users, tasks: tasks})
    // })
})

router.get('/home', (req, res) => {

    tasks = [
        {
            point: 1,
            names: ["eat fruit", "eat veggies"]
        },
        {
            point: 10,
            names: ["go the gym", "read the newspaper", "do your homework"]
        },
        {
            point: 5,
            names: ["ride a bike to work", "do PALOTOIES"]
        },
        {
            point: 100,
            names: ["wash dave's car"]
        }
    ]

    res.render("home", {tasks: tasks})
    console.log("rendered home")
})

router.get('/:name', (req, res) => {
    res.render(req.params.name)
})

router.get('/', (req, res) => {
    res.render("index")
})

router.post('/prize', (req, res) => {
    submission = req.body
    console.log(submission)

    prize = submission.prize
    tasks = submission.tasks

    if (prize.gold == null) { prize.gold = "N/A" }
    if (prize.platinum == null) { prize.platinum = "N/A" }

    the_data = "Name: " + prize.firstName + " " + prize.lastName + "\n"
    the_data += "Email: " + prize .email + "\n"
    the_data += getDateString() + "\n"
    the_data += "\n"
    the_data += "Total points: " + submission.points + "\n"
    the_data += "Silver prize: " + prize.silver + "\n"
    the_data += "Gold prize: " + prize.gold + "\n"
    the_data += "Platinum prize: " + prize.platinum + "\n"
    the_data += "\n"
    for (let key in tasks) {
        if (tasks.hasOwnProperty(key)) {
            the_data += key + ": " + tasks[key] + "\n"
        }
    }

    let d = new Date();

    let filename = "user_data/" + prize.firstName + "_" + prize.lastName + "_" + d.getTime() + ".txt"

    fs.writeFile(filename, the_data, function (err) {
        if (err) throw err;
        console.log('Updated!');
    });
    res.status(200).end()
})

function getDateString() {
    let d = new Date()
    return d.toString()
}

// router.get('/:name', (req, res) => {
//     res.sendFile(path.join(__dirname + "/" + req.params.name))
// })

router.get('/style/:name', (req, res) => {
    res.sendFile(path.join(__dirname + "/style/" + req.params.name))
})

router.get('/script/:name', (req, res) => {
    res.sendFile(path.join(__dirname + "/script/" + req.params.name))
})

router.get('/resources/:name', (req, res) => {
    res.sendFile(path.join(__dirname + "/resources/" + req.params.name))
})

// router.post('/home.html', (req, res) => {
//     // Point form submission
//     // Do something with the data
//     console.log(req.body)

//     // Send them back the homepage for now
//     res.sendFile(path.join(__dirname + "/home.html"))
// })

// Attach routes at root
app.use('/', router)

// Start server
app.listen(port)
console.log("Now serving on " + ip.address() + ":" + port + ".")
