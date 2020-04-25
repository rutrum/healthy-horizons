var mysql = require("mysql");

exports.db = class database {

    // Creates a new connection with healthy horizons database
    constructor() {
        let creds = require("./db_credentials.json")
        this.connection = mysql.createConnection(creds)
        this.connection.connect()
        console.log("Connected to database!")
    }

    // Ends connection with database
    destroy() {
        this.connection.end()
    }

    // Queries the database with the given query and parameters
    query_db(query, params, callback) {
        this.connection.query(query, params, (error, results) => {
            if (error) throw error
            callback(results)
        })
    }

    /// Task related functions

    // Gets all tasks
    all_tasks(callback) {
        let q = "SELECT task.*, tasktype.type FROM task, tasktype WHERE task.type_id = tasktype.id"
        this.query_db(q, [], callback)
    }

    // Gets the task of the given id
    task(id, callback) {
        let q = "SELECT * FROM task, tasktype WHERE task.type_id = tasktype.id AND id = ?"
        this.query_db(q, [id], callback)
    }

    // Adds the given task
    add_task(task, callback) {
        let q = "INSERT INTO task SET ?;"
        this.query_db(q, [task], callback)
    }

    /// User related functions

    // Gets all users
    all_users(callback) {
        let q = `SELECT * from user;`
        this.query_db(q, [], callback)
    }

    // Gets a user of the given id
    user(id, callback) {
        let q = `SELECT * FROM user WHERE id = ?;`
        this.query_db(q, [id], callback)
    }

    // Adds the current user
    add_user(user, callback) {
        let q = "INSERT INTO user SET ?"
        this.query_db(q, user, callback)
    }

    /// Usertask related functions

    usertasks(user_id, week_num, semester, callback) {
        let q = "SELECT usertask.* FROM usertask WHERE user_id = ? AND week = ? AND semester_id = ?"
        this.query_db(q, [user_id, week_num, semester], callback)
    }

    // Given a user_id, week_num, update the database
    // with the contents of data.
    // data: {water: 4, fruit: 5, thousand_steps: 2}
    update_usertasks(user_id, week_num, semester, data, callback) {
        console.log(week_num)
        let q = "";
        for (let [task_id, freq] of Object.entries(data)) {
            let oneq = mysql.format("INSERT INTO usertask (user_id, week, semester_id, task_id, frequency) VALUES (?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE frequency = ?; ", [user_id, week_num, semester, task_id, freq, freq]);
            q += oneq
        }
        this.query_db(q, [], callback)
    }


    /// Prize and tier related functions

    submitted_prizes(userid, semester, callback) {
        let q = "SELECT prize_id FROM submission WHERE user_id = ? AND semester_id = ?"
        this.query_db(q, [userid, semester], callback)
    }

    prize_lower_bound(callback) {
        let q = "SELECT MIN(points) as points FROM tier"
        this.query_db(q, [], callback)
    }

    all_tiers(callback) {
        let q = "SELECT * FROM tier ORDER BY points ASC"
        this.query_db(q, [], callback)
    }

    all_prizes(callback) {
        let q = "SELECT * FROM prize"
        this.query_db(q, [], callback)
    }

    // Move this functionality somewhere else
    all_prizes_and_tiers(callback) {
        this.all_tiers(tiers => {
            this.all_prizes(prizes => {
                let result = []
                tiers.forEach(tier => {
                    let prize_names = prizes.filter(prize => prize.tier_id == tier.id).map(prize => prize.description)
                    result.push({
                        name: tier.name.replace(/^\w/, c => c.toUpperCase()),
                        point: tier.points,
                        prizes: prize_names
                    })
                })
                console.log(JSON.stringify({result: result}))
                callback(result)
            })
        })
    }

    all_eligible_prizes_and_tiers(user_id, semester, callback) {
        this.total_points(user_id, semester, points => {
            let q = "SELECT * FROM tier WHERE points <= ? ORDER BY points ASC"
            this.query_db(q, [points], tiers => {
                console.log(tiers)
                this.all_prizes(prizes => {
                    let result = []
                    tiers.forEach(tier => {
                        let prize_names = prizes.filter(prize => prize.tier_id == tier.id).map(prize => { return { "name": prize.description, "id": prize.id }} )
                        result.push({
                            name: tier.name.replace(/^\w/, c => c.toUpperCase()),
                            id: tier.id,
                            point: tier.points,
                            prizes: prize_names
                        })
                    })
                    console.log(JSON.stringify({result: result}))
                    callback(result)
                })
            })
        })
    }

    // This function takes the series of rows and converts it into
    // a data structure like so:
    // [ { name: silver, points: 150, prizes: [ { name: gloves, id: 1 }, ... ] }, { name: gold, ... } ... ]
    layer_prizes_and_tiers(rows) {
        //let tiers = [...new Set(rows.map(row => { id: row.tier_id, name: row.name, points: row.points } ]
        /*let tiers = []
        tiers.map(tier => {
             let prizes = rows.filter(row => row.tier_id = tier.id)
                .map(row => { id: row.id, name: row.description })
            return {
                id: tier.id,
                name: tier.name,
                points: tier.points,
                prizes: prizes
            }
        })*/
    }

    /// Points for a given user

    total_points(user_id, semester, callback) {
        let q = "SELECT SUM(frequency * points) AS total FROM usertask INNER JOIN task ON task_id = task.id WHERE user_id = ? AND semester_id = ?"
        this.query_db(q, [user_id, semester], result => callback(result[0].total))
    }

    weekly_points(user_id, semester, callback) {
        let q = "SELECT week, SUM(frequency * points) AS points FROM usertask INNER JOIN task ON task_id = task.id WHERE user_id = ? AND semester_id = ? GROUP BY week"
        this.query_db(q, [user_id, semester], callback)
    }

    /// Submissions

    // Submit prizes.  Prizes have keys of tiers and values of prizes
    prize_submission(user_id, semester, prizes, callback) {
        let q = ""
        for (let [tier, prize] of Object.entries(prizes)) {
            let oneq = mysql.format("INSERT INTO submission (user_id, semester_id, tier_id, prize_id) VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE prize_id = ?;", [user_id, semester, tier, prize, prize])
            q += oneq
        }
        this.query_db(q, [], callback)
    }

    all_users_points(callback) {
        let q = "SELECT user.id, SUM(frequency * points) AS points FROM user INNER JOIN usertask ON usertask.user_id = user.id INNER JOIN task ON usertask.task_id = task.id GROUP BY user.id"
        this.query_db(q, [], callback)
    }
}
