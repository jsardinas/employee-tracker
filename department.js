const mysql = require('mysql2/promise');

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

const getDepartments = async () => {
    const conn = await mysql.createConnection(
        {
          host: 'localhost',
          user: 'root',
          password: 'admin',
          database: 'employees_db'
        },
    );
    let [rows, fields] = await conn.execute(query);
    return rows;
}

const addDepartment = (name) => {
    db.query(`insert into department(department_name) values("${name}")`);
}

module.exports = {showDepartments, addDepartment, getDepartments};
