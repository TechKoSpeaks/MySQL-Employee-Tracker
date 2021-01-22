
//--------------------REQUIRE AND CONSTANTS(VARIABLES) DEFINED---------------------//
// Import mySQL, inquirer for function and figlet for aesthetic // 

const mysql = require("mysql");
const inquirer = require("inquirer");
const figlet = require("figlet");
// Requiring table console for generating tables //
const cTable = require("console.table");


//--------------------------CONNECTION-------------------------------//
    // Create connection for information on the SQL database //
const connection = mysql.createConnection({
    host: "localhost",
    // Add in port to use
    port: 3306,
    // Username and password and databse used //
    user: "root",
    password: "password",
    database: "employees_db",

});

// Cool font for showing the employee tracker name//
figlet("DoughDough Employee Tracker", (err, result) => {
    console.log(err || result);
});

// Connect to mysql server and established database //
connection.connect((err) => {
    if (err) {
        throw err;
    }
    // Run the start function after the connection is made to prompt the user
    return avOptions();
});




//----------------------ADD OR VIEW OVERALL OPTIONS--------------------//
    // Lists/prompts an option for either adding or viewing info //
function avOptions() {
  return inquirer
    .prompt({
      name: "avOptions",
      type: "list",
      message: "Select to ADD or VIEW",
      choices: ["Add", "View"]
    })
    .then((answer) => {
      if (answer.avOptions === "Add") {
        return start();
      } else if (answer.avOptions === "View") {
        return view();
      } else {
        connection.end(); 
      }
    })
    .catch((error) => {
      console.log(error);

    });
}


//---------------------------START FUNCTION------------------------------//
    // Create start function to prompt user for adding information //
function start() {
    return inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "What would you like to do?",
            choices: [
                "Add a Department",
                "Add a role",
                "Add an Employee",
                "Exit",
            ],
        }).then((answer) => {
            switch (answer.action) {
                case "Add a Department":
                    figlet("Adding Departments!", (err, result) => {
                        console.log(err || result);
                    });
                    addDepartment();
                    break;
                case "Add a role":
                    figlet("Role your Boat!", (err, result) => {
                        console.log(err || result);
                    });
                    addRole();
                    break;
                case "Add an Employee":
                    figlet("Add that Employee!", (err, result) => {
                        console.log(err || result);
                    });
                    addEmployee();
                    break;
                case "Exit":
                    figlet("Back to Menu!", (err, result) => {
                        console.log(err || result);
                    });
                    avOptions();
                default:
                    connection.end();
            }
        })
}


//-------------------------------VIEW FUNCTION-------------------------------------//
    // View function asking user view category (department, roles, employees) //
function view() {
  return inquirer
    .prompt({
      name: "view",
      type: "list",
      message: "Which category would you like to view?",
      choices: ["View Employees By Department", "View Employees By Role", "View All Employees", "EXIT"]
    })
    .then((answer) => {
      if (answer.view === "View Employees By Department") {
        return viewDepartment();
      } else if (answer.view === "View Employees By Role") {
        return viewRoles();
      } else if (answer.view === "View All Employees") {
        return viewEmployees();
      } else if (answer.view === "EXIT") {
        return avOptions();
      } else {
         connection.end(); 
      }
    })
    .catch((error) => {
      console.log(error);
    });
}


//-------------------------ADDING DEPARTMENTS------------------------//
    // Function created for adding new departments in //
function addDepartment() {
  return inquirer
    .prompt([
      {
        name: "department",
        type: "input",
        message: "Please input the name of the department you would like to add:"
      },
    ])
    .then((answer) => {
    // Based on prompt input, return data with department inserted in table //
      return connection.query(
        "INSERT INTO department SET ?",
        {
          name: answer.department
        },
        (err) => {
          if (err) {
            throw err;
          }
          figlet("Success!", (err, result) => {
            console.log(err || result);
        });
          console.log("This department was added successfully!");
          return avOptions();
        }
      );
    });
}

//-------------------------ADDING ROLES------------------------------//
    // Creating a function for adding in roles in tables //
function addRole() {
  return inquirer
    .prompt([
      {
        name: "role",
        type: "input",
        message: "What is the name of the role that you would like to add?"
      },
      {
        name: "salary",
        type: "input",
        message: "What is the paying salary for this role/title (numbers please)?"
      },
    ])
    .then((answer) => {
      // Return and insert a new item into the database with following information //
      return connection.query(
        "INSERT INTO role SET ?",
        {
          title: answer.role,
          salary: answer.salary
        },
        (err) => {
          if (err) {
            throw err;
          }
          figlet("Success!", (err, result) => {
            console.log(err || result);
        });
          console.log("Your role was added successfully!");
          return avOptions();
        }
      );
    });
}

//----------------------------ADDING EMPLOYEES------------------------------------//
    // These are the prompts and functions for adding a new employee //
function addEmployee() {
  return inquirer
    .prompt([
      {
        name: "first_name",
        type: "input",
        message: "Please provide the first name of this employee:"
      },
      {
        name: "last_name",
        type: "input",
        message: "What is the last name of the employee you want to add?"
      },
      {
        name: "title",
        type: "input",
        message: "Choose number for role: 1=Emperor, 2=Sith Warrior, 3=Sith Attorney, 4=Stormtrooper, 5=Sith HR Specialist, 6=Sith Sweeper, 7=Sith CFO, 8=Sith Salesperson: "
      },
      {
        name: "manager_id",
        type: "input",
        message: "What is the manager ID of the employee you want to add (numeric please)?"
      },
    ])
    .then((answer) => {
      return connection.query(
        "INSERT INTO employee SET ?",
        {
          first_name: answer.first_name,
          last_name: answer.last_name,
          role_id: answer.title,
          manager_id: answer.manager_id
        },
        (err) => {
          if (err) {
            throw err;
          }
          figlet("Success!", (err, result) => {
            console.log(err || result);
        });
          console.log("Your employee was added successfully!");
          return avOptions();
        }
      );
    });
}




//-------------------------VIEWING FUNCTIONS---------------------------------//
    // Creating a function for viewing all departments //
function viewDepartment() {
    const query = `SELECT department.name, employee.first_name, employee.last_name
    FROM employee
    LEFT JOIN department ON department.id = employee.id`;
    connection.query(query, function (err, res) {
      if (res) {
        console.table(res);
      } else {
        console.log(err);
      }
    return avOptions();
  });
}

// Function for viewing roles within the tables //
function viewRoles() {
    const query = `SELECT e.id, r.title, d.name AS department, r.salary, CONCAT(m.first_name, " ", m.last_name) AS manager
    FROM employee e
    LEFT JOIN role r
      ON e.role_id = r.id
    LEFT JOIN department d
    ON d.id = r.department_id
    LEFT JOIN employee m
      ON m.id = e.manager_id`;
    connection.query(query, function (err, res) {
      if (res) {
        console.table(res);
      } else {
        console.log(err);
      }
    return avOptions();
  });
}

// Created a function for viewing employees with specifics defined from table (first/last name, etc.) //
function viewEmployees() {
  const query = `SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department, r.salary, CONCAT(m.first_name, " ", m.last_name) AS manager
  FROM employee e
  LEFT JOIN role r
    ON e.role_id = r.id
  LEFT JOIN department d
  ON d.id = r.department_id
  LEFT JOIN employee m
    ON m.id = e.manager_id`;
    connection.query(query, function (err, res) {
      if (res) {
        console.table(res);
      } else {
        console.log(err);
      }
    return avOptions();
  });
}


