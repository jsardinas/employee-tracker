const mysql = require('mysql2');

const query = 'SELECT e.id as ID, e.first_name, e.last_name, roles.title, roles.salary, department.department_name, CONCAT(e2.first_name, " ", e2.last_name) as manager FROM employee as e JOIN roles on e.role_id = roles.id JOIN department on roles.department_id = department.id LEFT JOIN employee as e2 on e.manager_id=e2.id;';

const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'admin',
      database: 'employees_db'
    },
);


const showEmployees = () => {
    db.query(query, (err,res,fields) => {
        console.log(res);
    });    
}


const addEmployee = (first, last, role, manager) => {
    db.query(`INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES("${first}", "${last}", ${role}, ${manager})`);
}


const updateRole = (eId, rId) => {
    const qry = `UPDATE employee SET role_id = ${rId} WHERE id = ${eId}`;
    db.query(qry);
}

module.exports = {showEmployees, addEmployee, updateRole};
