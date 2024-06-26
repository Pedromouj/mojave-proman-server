const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: process.env.NODE_DB_HOST,
  user: process.env.NODE_DB_USER,
  password: process.env.NODE_DB_PASSWORD,
  database: process.env.NODE_DB_DATABASE,
});

module.exports = connection;
