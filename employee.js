const mysql = require('mysql2/promise');

const query = 'SELECT e.id as ID, e.first_name, e.last_name, roles.title, roles.salary, department.department_name, CONCAT(e2.first_name, " ", e2.last_name) as manager FROM employee as e JOIN roles on e.role_id = roles.id JOIN department on roles.department_id = department.id LEFT JOIN employee as e2 on e.manager_id=e2.id;';

const getEmployeesFull = async () => {
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

const getEmployees = async () => {
    const conn = await mysql.createConnection(
        {
          host: 'localhost',
          user: 'root',
          password: 'admin',
          database: 'employees_db'
        },
    );
    let [rows, fields] = await conn.execute('SELECT id, first_name, last_name FROM employee');
    return rows;   
}


const addEmployee = async (first, last, role, manager) => {
    const conn = await mysql.createConnection(
        {
          host: 'localhost',
          user: 'root',
          password: 'admin',
          database: 'employees_db'
        },
    );
    conn.execute(`INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES("${first}", "${last}", ${role}, ${manager})`);
}


const updateRole = async (eId, rId) => {
    const conn = await mysql.createConnection(
        {
          host: 'localhost',
          user: 'root',
          password: 'admin',
          database: 'employees_db'
        },
    );
    const qry = `UPDATE employee SET role_id = ${rId} WHERE id = ${eId}`;
    conn.query(qry);
}

module.exports = {getEmployeesFull, addEmployee, updateRole, getEmployees};
