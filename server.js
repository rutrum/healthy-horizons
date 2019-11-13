var express = require('express')
var app = express()
var ip = require('ip')
var path = require('path')
var fs = require('fs')

// var DBHandler = require('./db_handler')
// var db = new DBHandler()

var port = process.env.PORT || 8080

var router = express.Router()

app.set('view engine', 'ejs')

// Allows us to parse POST request data
var bodyParser = require('body-parser')
app.use(bodyParser.json());

// On use of any request
router.use(function(req, res, next) {
    console.log("\nNew " + req.method + " request.")
    console.log(req.originalUrl)
    next()
})

// All file are served from the /src directory
__dirname = __dirname + "/src"

// Redirect favicon to the resources file
router.get('/favicon.ico', (req, res) => {
    res.sendFile(path.join(__dirname + '/resources/favicon.ico'))
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

    fs.writeFile('user_data/'+submission.prize.lastName+'.txt', JSON.stringify(submission),function (err) {
        if (err) throw err;
        console.log('Updated!')
      })

    res.status(200).end()
})

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
