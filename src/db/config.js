const mysql = require("mysql");

const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB_NAME,
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to DB: " + err.stack);
    return;
  }
  console.log("Connected to DB as ID: " + connection.threadId);
});

module.exports = connection;
