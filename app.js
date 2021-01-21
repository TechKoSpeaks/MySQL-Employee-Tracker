// Import mySQL, inquirer and figlet for aesthetic // 
const mysql = require("mysql");
const inquirer = require("inquirer");
// const { start } = require("repl");
const figlet = require("figlet");



// Create connection for information on the SQL database //
const connection = mysql.createConnection({
    host:"localhost",
    // Add in port to use
    port: 3306,
    // Username and password //
    user: "root",
    password: "password",
    database: "employees_db",

});

figlet("DoughDough Employee Tracker", (err, result) => {
    console.log(err || result);
  });

// Connect to mysql server and established database //
connection.connect((err) => {
    if (err) {
      throw err;
    }
    // run the start function after the connection is made to prompt the user
    start();
    getDepartment();
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
  // Selecting departments, roles, and employees //

  getDepartment = () => {
    connection.query("SELECT id, name FROM department", (err, res) => {
      if (err) throw err;
      departments = res;
      console.log(departments);
    })
  };

  getRoles = () => {
    connection.query("SELECT id, title FROM role", (err, res) => {
      if (err) throw err;
      roles = res;
      // console.table(roles);
    })
  };



  addInfo = () => {
    inquirer.prompt([
        {
            name: "add",
            type: "list",
            message: "What would you like to add?",
            choices: ["DEPARTMENT", "ROLE", "EMPLOYEE", "EXIT"]
          }
        ])
      .then((answer) => {
        // Using the answer input, either call the bid or the post functions for input
        switch (answer.action) {
          case "DEPARTMENT":
            addDepartment();
            break;
          case "ROLE":
            viewInfo();
            break;
          case "EMPLOYEE":
            updateInfo();
            break;
          case "EXIT":
            figlet("Thank you!", (err, result) => {
                console.log(err || result);
            });
            break;
          default:
            connection.end();
        }
      })
      .catch((error) => {
        console.log(error);
        process.exit(1);
      });
  };