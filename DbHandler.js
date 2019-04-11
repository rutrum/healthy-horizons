var Connection = require('tedious').Connection
var Request = require('tedious').Request

module.exports = class DBHandler {

    constructor() {
        
        // Create connection from credentials file  
        var config = require('./dbCred.json')
        this.connection = new Connection(config)

        // Feedback of connection success or failure
        this.connection.on('connect', function(err) {
            if (err) {
                console.log(err)
            } else {
                console.log("Server connection successful.")
            }
        })
    }

    getUserInfo(id, callback) {
        getUser(id, (userRow) => {

        })
    }

    isUser(email, password, callback) {
        this.getUser(email, password, (rows) => {
            console.log(rows)
            if (rows.length == 0) {
                callback(false)
            } else {
                callback(true)
            }
        })
    }

    getUser(id, callback) {
        var query = "SELECT * FROM users id=" + id;
        this.queryDatabase(query, callback)
    }

    getUser(email, pass, callback) {
        var query = "SELECT * FROM users WHERE email='" + email + "' AND password='" + pass + "'";
        this.queryDatabase(query, callback)
    }

    getTasks(user) {
        var query = "SELECT * FROM usertasks NATURAL JOIN tasks WHERE userID=" + user.id;
        this.queryDatabase(query, (tasks) => {
            console.log(tasks)
        })
    }

    // Removed metadata from columns and simplifies object structure
    clean(rows) {
        var cleanedRows = []
        rows.forEach(row => {
            var cleanedRow = {}
            for (let col in row) {
                cleanedRow[col] = row[col].value
            }
            cleanedRows.push(cleanedRow)
        })
        return cleanedRows
    }

    queryDatabase(query, callback) {
        console.log(query)
        var request = new Request(query, (err, rowCount, rows) => {
            if (err) {
                callback(err.message)
            } else {
                callback(this.clean(rows))
            }
        })

        this.connection.execSql(request)
    }

}