
const db = require('./db')

const query = 'SELECT * FROM department';

const getDepartments = async () => {
    const conn = await db.getDbConnection();
    let [rows, fields] = await conn.execute(query);
    return rows;
}

const addDepartment = async (name) => {
    const conn = await db.getDbConnection();
    conn.execute(`insert into department(department_name) values("${name}")`);
    conn.end();
}

module.exports = {addDepartment, getDepartments};
