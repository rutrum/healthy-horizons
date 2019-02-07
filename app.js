var http = require('http')
var url = require('url')
var fs = require('fs')
var ip = require('ip')

var server = http.createServer(function (req, res) {
    var q = url.parse(req.url, true);

    // Forces path name to start in currect directory
    var filename = "." + q.pathname;

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
                    res.writeHead(404, { 'Content-Type': 'text/html' });
                    return res.end("Literally the 404 page was not found.");
                }

                // Send 404 page.
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write(data);
                return res.end();

            })

        } else {

            // Send requested page
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(data);
            return res.end();

        }
    });
})

server.listen(8080);

console.log("Now serving on " + ip.address() + ":8080.")