
    var Connection = require('tedious').Connection
    var Request = require('tedious').Request

    var config = require('./dbCred.json')

    var connection = new Connection(config)

    connection.on('connect', function (err) {
        if (err) {
            console.log(err)
        } else {
            console.log("Server connection successful.")
        }
    })

    exports.testRequest = function (callback) {
        request = new Request("SELECT * FROM ITFacilities", function (err, rowCount) {
            if (err) {
                console.log(err)
                callback("Internal Server Error")
            }
        })

        // Upon completion of query, sends rows into callback function
        request.on('doneInProc', function (rowCount, more, rows) {
            callback(rows)
        })

        connection.execSql(request)

    }
