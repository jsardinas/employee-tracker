const mysql = require('mysql2');

const query = 'SELECT roles.title as JobTitle, roles.id as ID, department.department_name AS Department FROM roles JOIN department ON roles.department_id = department.id';


const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'admin',
      database: 'employees_db'
    },
);


const showRoles = () => {
    db.query(query, (err,res,fields) => {
        console.log(res);
    });    
}

const addRole = (title, salary, department) => {
    const qry = `INSERT INTO roles(title, salary, department_id) values("${title}", ${salary}, ${department})`;
    console.log(qry);
    db.query(qry);
}

module.exports = {showRoles, addRole};
