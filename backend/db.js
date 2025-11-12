import mysql from "mysql2";
import { config } from "dotenv";

config();

const db = mysql.createConnection({
  host: process.env.DB_HOSTNAME || "localhost",
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_DBNAME || "stayconnected",
});

// Create tables if they don't exist
const createTables = () => {
  // Create users table
  const createUsersTable = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(255) UNIQUE NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      img VARCHAR(255),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `;

  // Create posts table
  const createPostsTable = `
    CREATE TABLE IF NOT EXISTS posts (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      content TEXT NOT NULL,
      image VARCHAR(255),
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      user_id INT NOT NULL,
      category VARCHAR(100),
      is_published TINYINT(1) DEFAULT 1,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `;

  // Execute table creation queries
  db.query(createUsersTable, (err) => {
    if (err) {
      console.error("Error creating users table:", err);
      return;
    }
    console.log("✓ Users table ready");
  });

  db.query(createPostsTable, (err) => {
    if (err) {
      console.error("Error creating posts table:", err);
      return;
    }
    console.log("✓ Posts table ready");
  });
};

db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    console.error("\nPlease ensure:");
    console.error(`1. MySQL is running`);
    console.error(
      `2. Database '${process.env.DB_DBNAME || "stayconnected"}' exists`
    );
    console.error(
      `3. Create it with: CREATE DATABASE ${
        process.env.DB_DBNAME || "stayconnected"
      };`
    );
    return;
  }
  console.log("✓ Connected to MySQL");

  // Create tables after successful connection
  createTables();
});

export default db;
