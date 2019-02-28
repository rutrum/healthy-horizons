var mysql = require('mysql')



export function createConnection(){
    
}

class DbHandler{
    
    //DbHandler constructor and connection
    DbHandler(){
        var con = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "password"
        })

        con.connect(function (err) {
            if (err) throw err
            console.log("Connected!")
        })
    }

    //Function takes a SQL query and rerturns the result
    Query(input){
        con.connect(function (err) {
            if (err) throw err
            console.log("Connected!")
            con.query(input, function (err, result) {
                if (err) throw err
                console.log("Result: " + result)
            })
        })
    }

    Login(){
        var input = "Select email, password from User Where Email = @email AND Password = @Password";
        DbHandler.Query(input)
        
    }
}