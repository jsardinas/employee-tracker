const db = require('./db');

const query = 'SELECT roles.id as ID, roles.title as JobTitle, department.department_name AS Department FROM roles JOIN department ON roles.department_id = department.id';

const getRoles = async () => {
    const conn = await db.getDbConnection();

    let [rows, fields] = await conn.execute(query);
    return rows;
}

const addRole = async (title, salary, department) => {
    const conn = await db.getDbConnection();
    conn.execute(`INSERT INTO roles(title, salary, department_id) values("${title}", ${salary}, ${department})`);
}

module.exports = {addRole, getRoles};
