const mysql = require('mysql2/promise');
const {MYSQL_USER, MYSQL_PWD,MYSQL_HOST, MYSQL_PORT, MYSQL_DB} = require('./config');

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    port: MYSQL_PORT,
    database: process.env.MYSQL_DB,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    password: ''
});


module.exports = pool;