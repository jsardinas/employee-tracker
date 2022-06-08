const mysql = require('mysql2/promise');

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
    console.log(rows);
    return rows;
}

const addRole = (title, salary, department) => {
    db.query(`INSERT INTO roles(title, salary, department_id) values("${title}", ${salary}, ${department})`);
}

module.exports = {showRoles, addRole, getRoles};
