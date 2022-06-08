const mysql = require('mysql2');

const query = 'SELECT * FROM department';

const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'admin',
      database: 'employees_db'
    },
);

const showDepartments = () => {
    db.query(query, (err,res,fields) => {
        console.log(res);
    });    
}


const addDepartment = (name) => {
    db.query(`insert into department(department_name) values("${name}")`);
}

module.exports = {showDepartments, addDepartment};
