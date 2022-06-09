insert into department(department_name) values
('engineering'),
('not engineering');

insert into roles(title, salary, department_id) values
('software engineer', 120000, 1),
('senior engineer', 160000, 1),
('staff engineer', 200000, 1),
('ceo', 300000, 2);

insert into employee(first_name, last_name, role_id, manager_id) values
('pepe', 'garcia', 3, NULL),
('jose', 'garcia', 2, 1),
('pepon', 'garcia', 1, 1),
('pepin', 'garcia', 1, 1),
('parasite', 'in chief', 4, NULL);

