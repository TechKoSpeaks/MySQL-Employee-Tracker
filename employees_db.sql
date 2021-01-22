
DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;

USE employees_db;

-- Creating a table for the departments with an ID and name, primary key as ID --
CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL,
  PRIMARY KEY (id)
);

-- Creating a table for roles within departments, with ID, title, salary and department --
CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(10, 2) NOT NULL,
    department_id INT,
    PRIMARY KEY (id)
);

-- Creating employee table with name, role and manager ID --
CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR (30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT NULL, 
  manager_id INT, 
  PRIMARY KEY (id)
);

INSERT INTO department (name)
VALUES ("Sith Lords"), ("Sith Legal Team"), ("Sith Minions"), ("Sith Human Resources"), ("Sith Janitors"), ("Sith Finance");

INSERT INTO role (title, salary, department_id)
VALUES ("Emperor", "1000000", "7"), ("Sith Attorney", "75000", "2"), ("Stormtrooper", "45000", "3"), ("Sith HR Specialist", "60000", "4"), ("Sith Sweeper", "60000", "5"), ("Sith CFO", "70000", "6"), ("Sith Salesperson", "40000", "1");

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Darth", "Maul", "2", "2"), ("Emperor", "Palpatine", "1", "1"), ("Joey", "The Janitor", "5", "7"), ("GenEric", "Stormtrooper", "3", "6"), ("Karen", "Idontcare", "4", "3"), ("Will", "Sellyoursoul", "6", "3"), ("Ivana", "Belightside", "7", "5");



SELECT * FROM employees_db.department;

SELECT * FROM employees_db.role;

SELECT * FROM employees_db.employee;







-- Query for view all --
SELECT e.id, e.first_name, e.last_name, d.name AS department, r.title, r.salary, CONCAT_WS(" ", m.first_name, m.last_name) AS manager FROM employee e LEFT JOIN employee m ON m.id = e.manager_id INNER JOIN role r ON e.role_id = r.id INNER JOIN department d ON r.department_id = d.id ORDER BY e.id ASC;

-- Query for view all roles --
SELECT  r.id, r.title, r.salary, d.name as Department_Name FROM role AS r INNER JOIN department AS d ON r.department_id = d.id;

--Query for getting employees --
SELECT id, CONCAT_WS(' ', first_name, last_name) AS Employee_Name FROM employee

-- Query for updating --
UPDATE employee SET role_id = 3 WHERE id = 8;
UPDATE employee SET ? WHERE ?;

-- Query for Delete??? --
DELETE FROM department WHERE id = 13;





