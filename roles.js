const mysql = require('mysql2/promise');

const query = 'SELECT roles.id as ID, roles.title as JobTitle, department.department_name AS Department FROM roles JOIN department ON roles.department_id = department.id';

const getRoles = async () => {
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

const addRole = async (title, salary, department) => {
    const conn = await mysql.createConnection(
        {
          host: 'localhost',
          user: 'root',
          password: 'admin',
          database: 'employees_db'
        },
    );
    conn.query(`INSERT INTO roles(title, salary, department_id) values("${title}", ${salary}, ${department})`);
}

module.exports = {addRole, getRoles};
