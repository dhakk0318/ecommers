const mysql = require('mysql');
const dotenv = require('dotenv');

dotenv.config(); 

const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE_NAME,
    port: process.env.DATABASE_PORT || 3306 
});    

connection.connect(err => {
    if (err) {
        console.error('Error connecting to the database:', err);
        process.exit(1);
    }
    console.log('DB Connect🛜  ✔');
});

module.exports = connection;
