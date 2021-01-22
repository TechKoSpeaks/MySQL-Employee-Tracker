INSERT INTO department (name)
VALUES 
("Sith Lords"), 
("Sith Legal Team"), 
("Sith Minions"), 
("Sith Human Resources"), 
("Sith Janitors"), 
("Sith Finance");

INSERT INTO role (title, salary, department_id)
VALUES 
("Emperor", "1000000", "7"),
("Sith Attorney", "75000", "2"),
("Stormtrooper", "45000", "3"), 
("Sith HR Specialist", "60000", "4"),
("Sith Sweeper", "60000", "5"), 
("Sith CFO", "70000", "6"), 
("Sith Salesperson", "40000", "1");

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
("Darth", "Maul", "2", "2"), 
("Emperor", "Palpatine", "1", "1"), 
("Joey", "The Janitor", "5", "7"), 
("GenEric", "Stormtrooper", "3", "6"), 
("Karen", "Idontcare", "4", "3"), 
("Will", "Sellyoursoul", "6", "3"), 
("Ivana", "Belightside", "7", "5");
