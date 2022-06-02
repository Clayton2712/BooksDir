//Define database model
const mysql = require('mysql');
const dbConfig = require('../config/dbConfig');

//Create db connection
const connection = mysql.createConnection(
    {
        host: dbConfig.HOST,
        user: dbConfig.USER,
        password: dbConfig.PASSWORD,
        database: dbConfig.DB
    }
);

//open MySQL connection
connection.connect(error => {
    if (error) throw error;
    console.log('Database connection successful!');
});
module.exports = connection;
