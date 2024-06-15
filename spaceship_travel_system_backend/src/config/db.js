import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();

const dbConnection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

dbConnection.connect((err) => {
  if (err) {
    console.error("Error connecting to the database" + err.stack);
    return;
  }
  console.log("Connected to database as ID " + dbConnection.threadId);
});

export default dbConnection;
