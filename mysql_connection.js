var mysql = require("mysql");
// var connection = mysql.createConnection({
//   host     : 'localhost',
//   user     : 'root',
//   password : 'healthy.team',
//   database : 'healthydb'
// });

// connection.connect();

// getTask(1); //TaskID
// getTasks();
//getSizeofTasks(); 
//getUserTasksByUser("'Earl'","'Gill'"); //First Name,Last Name
//insertAllTasksNewUser(3,datetime); // new user id, date  NEEDS getSizeofTasks to run but there are still issues
//getUserbyName("'Earl'","'Gill'"); //First Name,Last Name
//getUserbyID(1);
//getSizeofUsers(); 
//insertNewUser("'aekuhn2@butler.edu'","'Alex'","'Kuhn'"); //email,First Name,Last Name 
//updateUserTasks(1,1,"'2019-11-5'",1); //UserID,TaskID,date,frequency
//getUserTasks();

// connection.end();

// function getTask(taskId){
//   connection.query('SELECT * FROM tasks WHERE id = '+taskId, function (error, results, fields) {
//     if (error) throw error;
//     console.log('The solution is: ', results);
//   });
// };

// //not returning a usable number yet it is printable
// function getSizeofTasks(){
//   connection.query('SELECT COUNT(id) FROM tasks;', function (error, results, fields) {
//     if (error) throw error;
//     console.log(results[0]["COUNT(id)"]);
//     return results[0]["COUNT(*)"];
//   });
// };

// function getUserTasksByUser(f_name,l_name){
//   connection.query('SELECT * FROM usertasks WHERE users_id = '+
//                     '(SELECT id FROM users WHERE '+
//                     'f_name = '+f_name+' AND '+
//                     'l_name = '+l_name+')', 
//     function (error, results, fields) {
//     if (error) throw error;
//     console.log('The solution is: ', results);
//   });
// };

// //trouble returning getSizeofTasks() as a usable variable to insert blank entries for a new user (response is undefined)
// function insertAllTasksNewUser(users_id,date){
//   sizeofTasks = getSizeofTasks();
//   console.log(sizeofTasks);
//   for (i=1;i<=sizeofTasks;i++){
//     connection.query("INSERT INTO `mydb`.`usertasks` (`users_id`, `tasks_id`, `date`, `frequency`)"+
//                       ' VALUES( '+users_id+
//                       ', '+i+
//                       ', "2019-11-18"'+
//                       ', 0)',  
//       function (error, results, fields) {
//       if (error) throw error;
//       console.log('The solution is: ', results);
//     });  
//   };
// };

// //cannot return usable datatype right now. same as getSizeofTasks() i believe
// function getSizeofUsers(){
//   connection.query('SELECT COUNT(*) FROM users;', function (error, results, fields) {
//     if (error) throw error;
//     console.log(results[0]["COUNT(*)"]);
//     return results[0]["COUNT(*)"];
//   });
// };

// function updateUserTasks(users_id,tasks_id,date,frequency){
//   connection.query("UPDATE `mydb`.`usertasks` SET `date`="+date+
//                                     ", `frequency`="+frequency+
//                                     " WHERE `users_id`= "+users_id+
//                                     " AND `tasks_id`= "+tasks_id, 
//   function (error, results, fields) {
//     if (error) throw error;
//     console.log('The solution is: ', results);
//   });
// };

// function getUserTasks(){
//   connection.query('SELECT * FROM usertasks', function (error, results, fields) {
//     if (error) throw error;
//     console.log('The solution is: ', results);
//   });
// };

exports.db = class database {
    constructor() {
        this.connection = mysql.createConnection({
            host     : 'localhost',
            user     : 'root',
            password : 'healthy.team',
            database : 'healthydb'
        })
        this.connection.connect()
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
}