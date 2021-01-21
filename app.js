// Import both mySQL and inquirer // 
const mysql = require("mysql");
const inquirer = require("inquirer");
// const { start } = require("repl");

// Create connection for information on the SQL database //
const connection = mysql.createConnection({
    host:"localhost",
    // Add in port to use
    port: 9000,
    // Username and password //
    user: "root",
    password: "password",
    database: "employeesDB",

});

// Connect to mysql server and established database //
connection.connect((err) => {
    if (err) {
      throw err;
    }
    // run the start function after the connection is made to prompt the user
    return start();
  });

// Create start function to prompt user //
function start() {
    return inquirer
      .prompt({
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: [
          "ADD",
          "VIEW",
          "UPDATE",
          "DELETE",
          "Exit",
        ],
      })
      .then((answer) => {
        // Using the answer input, either call the bid or the post functions for input
        switch (answer.action) {
          case "ADD":
            addInfo();
            break;
          case "VIEW":
            viewInfo();
            break;
          case "UPDATE":
            updateInfo();
            break;
          case "DELETE":
            deleteInfo();
            break;
          default:
            connection.end();
        }
      })
      .catch((error) => {
        console.log(error);
        process.exit(1);
      });
  }


  // Add in functions for GETTING all data (departments, managers, employees) //
