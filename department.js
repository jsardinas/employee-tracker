const mysql = require('mysql2/promise');

const query = 'SELECT * FROM department';

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

const addDepartment = async (name) => {
    const conn = await mysql.createConnection(
        {
          host: 'localhost',
          user: 'root',
          password: 'admin',
          database: 'employees_db'
        },
    );
    conn.query(`insert into department(department_name) values("${name}")`);
}

module.exports = {addDepartment, getDepartments};
