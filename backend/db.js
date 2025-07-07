import mysql from "mysql";
import { config } from "dotenv";

config();

const db = mysql.createConnection({
  host: process.env.DB_HOSTNAME || "localhost",
  port: process.env.DB_PORT || 3309,
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_DBNAME || "stayconnectedblog",
});

db.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL");
});

export default db;
