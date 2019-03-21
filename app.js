var http = require('http')
var url = require('url')
var fs = require('fs')
var ip = require('ip')

var DBHandler = require('./DbHandler')
let db = new DBHandler();


// require('./healthy_db_connection.js')

var server = http.createServer(function (req, res) {
    var q = url.parse(req.url, true)

    // Forces path name to start in currect directory
    var filename = "." + q.pathname

    // If path is empty, send them to the homepage
    if (q.pathname == "/") {
        filename = "./index.html"
    }

    // Load requested page
    fs.readFile(filename, function (err, data) {

        if (err) {
            
            // If file does not exist, load 404 page.
            fs.readFile("./404.html", function (err, data) {

                // If the 404 page doesn't exist, send a sad message.
                if (err) {
                    res.writeHead(404, { 'Content-Type': 'text/html' })
                    return res.end("Literally the 404 page was not found.")
                }

                // Send 404 page.
                res.writeHead(200, { 'Content-Type': 'text/html' })
                res.write(data)
                return res.end()

            })

        } else {

            // Determine content type by looking at requested file extension
            if (filename.endsWith("css")) {
                res.writeHead(200, { 'Content-Type': 'text/css' })
            } else if (filename.endsWith("js")) {
                res.writeHead(200, { 'Content-Type': 'application/javascript' })
            } else if (filename.endsWith("ico")) {
                res.writeHead(200, { 'Content-Type': 'image/ico' })
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' })
            }

            // Send requested page
            res.write(data)
            return res.end()

        }
    });
})

server.listen(8080);
console.log("Now serving on " + ip.address() + ":8080.")
