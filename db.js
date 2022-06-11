require('dotenv').config();
const mysql = require('mysql2/promise');

const getDbConnection = async () => {
    console.log('create db conn');
    try{
        const conn = await mysql.createConnection(
            {
            host: 'localhost',
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
            },
        );
        return conn;    
    }
    catch(err){
        console.log('Caught exception: ', err);
        return  null;
    }
    
}

module.exports = {getDbConnection};