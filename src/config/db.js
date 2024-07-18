const mysql = require('mysql2');


const pool = mysql.createPool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME
})

// variable global para usar sobre las queries
global.db = pool.promise();


