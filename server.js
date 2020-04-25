var express = require('express')
var app = express()
var ip = require('ip')
var path = require('path')
var fs = require('fs')

var database = require('./database')
var db = new database.db()

var port = process.env.PORT || 8080

var router = express.Router()

app.set('view engine', 'ejs')

// Adds automatic SASS preprocessing
var sassMiddleware = require('node-sass-middleware');
app.use('/css', sassMiddleware({
    src: path.join(__dirname, '/sass'),
    dest: path.join(__dirname, '/static/css'),
    debug: true,
    outputStyle: 'expanded',
}))

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

// Set static directory
router.use(express.static('static'))

router.get('/prizes', (req, res) => {
    db.all_prizes_and_tiers(result => {
        res.render("prizes", {tiers: result})
        console.log("rendered prizes")
    })
})

router.get('/calendar', (req, res) => {
    db.all_tasks(tasks => {
        db.weekly_points(1, 1, points => {
            pointmap = {}
            points.forEach((week) => { pointmap[week.week] = week.points })
            console.log(pointmap)
            res.render("cal", { tasks: tasks, points: pointmap })
        })
    })
})

router.get('/', (req, res) => {
    res.render("index")
})

router.get('/prize-selection', (req, res) => {
    db.all_eligible_prizes_and_tiers(1, 1, result => {
        res.render("prize_selection", { tiers: result, total: 10 })
    })
})

router.get('/admin', (req, res) => {
    db.all_users_points(result => {
        res.render("admin", { users: result })
    })
})

router.post('/prize-selection/:userid/:semester/', (req, res) => {
    console.log(req.body)
    db.prize_submission(req.params.userid, req.params.semester, req.body, result => {
        console.log(result)
        res.status(200).end()
    })
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


//  __ _ _ __ (_)
// / _` | '_ \| |
//| (_| | |_) | |
// \__,_| .__/|_|
//      |_|     

router.get('/api/:userid/:semesterid', (req, res) => {
    db.weekly_points(req.params.userid, req.params.semesterid, results => {
        console.log(results)
        res.send(JSON.stringify(results))
    })
})

router.get('/api/weekpoints/:userid/:semesterid', (req, res) => {
    db.weekly_points(req.params.userid, req.params.semesterid, results => {
        console.log(results)
        res.send(JSON.stringify(results))
    })
})

router.get('/api/tasks', (req, res) => {
    db.all_tasks(results => {
        res.send(JSON.stringify(results))
    })
})

// Returns array of the following form as json:
// [ { name: "bronze", points: 250 },
//   { name: "silver", points, 350 },
//   ... ]
router.get("/api/tiers", (req, res) => {
    db.all_tiers(results => {
        res.send(JSON.stringify(results))
    })
})

// Returns an object of the following form as json:
// { vegetables: 1, water: 1, readbook: 5, pitchinforlunch: 5 }
// Keys should be task names and values should be how many points
// it is worth.
router.get("/api/task_points", (req, res) => {
    db.all_tasks(results => {
        let data = {}
        results.forEach(result => {
            let id = result["id"]
            data[id] = result["points"]
        })
        console.log(data)
        res.send(JSON.stringify(data))
    })
})

// Returns all user tasks for the user of the given id
// in the given week.  Return value should be like
// { vegetables: 0, water: 2, readbook: 0, pitchinforlunch: 1 }
router.get("/api/user_tasks/:user_id/:week_num/:semester", (req, res) => {
    user_id = req.params.user_id
    week_num = req.params.week_num
    semester = req.params.semester
    db.usertasks(user_id, week_num, semester, results => {
        console.log(results)
        let points = {}
        results.forEach(row => {
            points[row["task_id"]] = row.frequency
        })
        res.send(JSON.stringify(points))
    })
})

// Updates all user tasks for the user of the given id
// in the given week.  Posted value should be like
// { vegetables: 0, water: 2, readbook: 0, pitchinforlunch: 1 }
// May also need to insert rows if new, or ignore rows that
// are 0 valued.
router.post("/api/user_tasks/:user_id/:week_num/:semester", (req, res) => {
    let user_id = req.params.user_id
    let week_num = req.params.week_num
    let semester = req.params.semester
    data = req.body
    db.update_usertasks(user_id, week_num, semester, data, (success) => {
        res.send("{ status: 200 }")
    })
})

// Gets the subsmission prize ids for the given user and semester
router.get("/api/submission_prizes/:user_id/:semester", (req, res) => {
    let user_id = req.params.user_id
    let semester = req.params.semester
    db.submitted_prizes(user_id, semester, prizeids => {
        res.send(JSON.stringify(prizeids))
    })
})

router.get("/api/eligible_prizes/:user_id/:semester", (req, res) => {
    let user_id = req.params.user_id
    let semester = req.params.semester
    db.all_eligible_prizes_and_tiers(user_id, semester, result => {
        res.send(JSON.stringify(result))
    })
})

router.get("/api/select_prizes_lower_bound", (req, res) => {
    db.prize_lower_bound(result => res.send(JSON.stringify(result)))
})

// Gets the list of tiers and prizes eligible for the given user.

// Other stuff

function getDateString() {
    let d = new Date()
    return d.toString()
}

// Attach routes at root
app.use('/', router)

// Start server
app.listen(port)
console.log("Now serving on " + ip.address() + ":" + port + ".")
