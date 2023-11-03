const mysql = require('mysql2')


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'school',
    connectionLimit: 10
})

module.exports = connection;