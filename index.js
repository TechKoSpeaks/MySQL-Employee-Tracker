const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table');
// create the connection information for the sql database
const connection = mysql.createConnection({
  host: 'localhost',
  // Your port; if not 3306
  port: 3306,
  // Your username
  user: 'root',
  // Your password
  password: 'password',
  database: 'employees_db',
});
// connect to the mysql server and sql database
connection.connect((err) => {
  if (err) {
    throw err;
  }
  // run the start function after the connection is made to prompt the user
  return addorView();
});
// function which prompts the user for what action they should take
function addorView() {
  return inquirer
    .prompt({
      name: 'addorview',
      type: 'list',
      message: 'Select to ADD or VIEW',
      choices: ['Add', 'View']
    })
    .then((answer) => {
      if (answer.addorview === 'Add') {
        return start();
      } else if (answer.addorview === 'View') {
        return view();
      } else {
        connection.end(); 
      }
    })
    .catch((error) => {
      console.log(error);

    });
}
// function which prompts the user for what action they should take
function start() {
  return inquirer
    .prompt({
      name: 'add',
      type: 'list',
      message: 'What do you want to add?',
      choices: ['Add Department', 'Add Role', 'Add Employee', 'EXIT']
    })
    .then((answer) => {
      if (answer.add === 'Add Department') {
        return addDepartment();
      } else if (answer.add === 'Add Role') {
        return addRole();
      } else if (answer.add === 'Add Employee') {
        return addEmployee();
      } else if (answer.add === 'EXIT') {
        return addorView();
      } else {
        connection.end(); 
      }
    })
    .catch((error) => {
      console.log(error);
      // process.exit(1);
    });
}
// function which prompts the user for what action they should take
function view() {
  return inquirer
    .prompt({
      name: 'view',
      type: 'list',
      message: 'What do you want to view?',
      choices: ['View Employees By Departments', 'View Employees By Roles', 'View All Employees', 'EXIT']
    })
    .then((answer) => {
      if (answer.view === 'View Employees By Departments') {
        return viewDepartment();
      } else if (answer.view === 'View Employees By Roles') {
        return viewRoles();
      } else if (answer.view === 'View All Employees') {
        return viewEmployees();
      } else if (answer.view === 'EXIT') {
        return addorView();
      } else {
         connection.end(); 
      }
    })
    .catch((error) => {
      console.log(error);
      // process.exit(1);
    });
}
// function to handle posting new items up for auction
function addDepartment() {
  // prompt for info about the item being put up for auction
  return inquirer
    .prompt([
      {
        name: 'department',
        type: 'input',
        message: 'What is the name of the department you want to add?'
      },
    ])
    .then((answer) => {
      // when finished prompting, insert a new item into the db with that info
      return connection.query(
        'INSERT INTO department SET ?',
        {
          name: answer.department
        },
        (err) => {
          if (err) {
            throw err;
          }
          console.log('Your department was added successfully!');
          // re-prompt the user for if they want to bid or post
          return addorView();
        }
      );
    });
}
function addRole() {
  // prompt for info about the item being put up for auction
  return inquirer
    .prompt([
      {
        name: 'role',
        type: 'input',
        message: 'What is the role you want to add?'
      },
      {
        name: 'salary',
        type: 'input',
        message: 'What is the salary you want to add?'
      },
    ])
    .then((answer) => {
      // when finished prompting, insert a new item into the db with that info
      return connection.query(
        'INSERT INTO role SET ?',
        {
          title: answer.role,
          salary: answer.salary
        },
        (err) => {
          if (err) {
            throw err;
          }
          console.log('Your role was added successfully!');
          // re-prompt the user for if they want to bid or post
          return addorView();
        }
      );
    });
}
function addEmployee() {
  // prompt for info about the item being put up for auction
  return inquirer
    .prompt([
      {
        name: 'first_name',
        type: 'input',
        message: 'What is the first name of the employee you want to add?'
      },
      {
        name: 'last_name',
        type: 'input',
        message: 'What is the last name of the employee you want to add?'
      },
      {
        name: 'title',
        type: 'input',
        message: 'What is the role/title of this employee?'
      },
      {
        name: 'manager_id',
        type: 'input',
        message: 'What is the manager ID of the employee you want to add?'
      },
    ])
    .then((answer) => {
      // when finished prompting, insert a new item into the db with that info
      return connection.query(
        'INSERT INTO employee SET ?',
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
          console.log('Your employee was added successfully!');
          // re-prompt the user for if they want to bid or post
          return addorView();
        }
      );
    });
}
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
    return addorView();
  });
}
function viewRoles() {
    const query = `SELECT e.id, r.title, d.name AS department, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager
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
    return addorView();
  });
}
function viewEmployees() {
  const query = `SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager
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
    return addorView();
  });
}