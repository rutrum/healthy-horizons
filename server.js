var express = require('express')
var app = express()
var ip = require('ip')
var path = require('path')

// var DBHandler = require('./db_handler')
// var db = new DBHandler()

var port = process.env.PORT || 8080

var router = express.Router()

app.set('view engine', 'ejs')

// Allows us to parse POST request data
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }));

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
    res.render('/home')
})

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/login.html'))
})

router.post('/login.html', (req, res) => {
    cred = req.body
    db.isUser(cred.email, cred.password, (isUser) => {
        console.log("isUser ", isUser)
        if (isUser) {
            res.sendFile(path.join(__dirname + "/home.html"))
        } else {
            res.sendFile(path.join(__dirname + "/login.html"))
        }
    })
})

router.get('/:name', (req, res) => {
    res.sendFile(path.join(__dirname + "/" + req.params.name))
})

router.get('/style/:name', (req, res) => {
    res.sendFile(path.join(__dirname + "/style/" + req.params.name))
})

router.get('/script/:name', (req, res) => {
    res.sendFile(path.join(__dirname + "/script/" + req.params.name))
})

router.get('/resources/:name', (req, res) => {
    res.sendFile(path.join(__dirname + "/resources/" + req.params.name))
})

router.post('/home.html', (req, res) => {
    // Point form submission
    // Do something with the data
    console.log(req.body)

    // Send them back the homepage for now
    res.sendFile(path.join(__dirname + "/home.html"))
})

// Attach routes at root
app.use('/', router)

// Start server
app.listen(port)
console.log("Now serving on " + ip.address() + ":" + port + ".")
