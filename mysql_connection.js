var mysql = require("mysql");

exports.db = class database {
    constructor() {
        let creds = require("./db_credentials.json")
        this.connection = mysql.createConnection(creds)
        this.connection.connect()
        console.log("Connected to database!")
    }

    destroy() {
        this.connection.end()
    }

    query_db(query, callback) {
        this.connection.query(query, (error, results) => {
            if (error) throw error
            callback(results)
        })
    }

    query_db_with_params(query, params, callback) {
        this.connection.query(query, params, (error, results) => {
            if (error) throw error
            callback(results)
        })
    }

    /// Task related functions

    // Gets all tasks
    all_tasks(callback) {
        let q = "SELECT * FROM task;"
        this.query_db(q, callback)
    }

    // Gets the task of the given id
    task(id, callback) {
        let q = "SELECT * FROM task WHERE id = ?;"
        this.query_db_with_params(q, [id], callback)
    }

    // Adds the given task
    add_task(task, callback) {
        let q = "INSERT INTO task SET ?;"
        this.query_db_with_params(q, task, callback)
    }

    /// User related functions

    // Gets all users
    all_users(callback) {
        let q = `SELECT * from user;`
        this.query_db(q, callback)
    }

    // Gets a user of the given id
    user(id, callback) {
        let q = `SELECT * FROM user WHERE id = ?;`
        this.query_db_with_params(q, [id], callback)
    }

    // Adds the current user
    add_user(user, callback) {
        let q = "INSERT INTO user SET ?;"
        this.query_db_with_params(q, user, callback)
    }

    /// Usertask related functions

    usertasks(user_id, callback) {
        let q = "SELECT * FROM usertask WHERE user_id = ?;"
        this.query_db_with_params(q, [user_id], callback)
    }

    // Given a user_id, week_num, update the database
    // with the contents of data.
    update_usertasks(user_id, week_num, data) {

    }


    /// Prizes and tiers related functions

    all_tiers(callback) {
        let q = "SELECT * FROM tier ORDER BY points ASC"
        this.query_db(q, callback)
    }

    all_prizes(callback) {
        let q = "SELECT * FROM prize"
        this.query_db(q, callback)
    }

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
}
