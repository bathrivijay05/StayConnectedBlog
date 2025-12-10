import pg from "pg";
import { config } from "dotenv";

config();

const { Pool } = pg;

const db = new Pool({
  host: process.env.DB_HOSTNAME || "localhost",
  port: process.env.DB_PORT || 5432,
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "root",
  database: process.env.DB_DBNAME || "stayconnected",
  ssl: {
    rejectUnauthorized: false,
  },
  max: 10, // Maximum number of clients in the pool
  idleTimeoutMillis: 30000, // Close idle clients after 30 seconds
  connectionTimeoutMillis: 2000, // Return an error after 2 seconds if connection could not be established
});

// Handle pool errors
db.on("error", (err, client) => {
  console.error("Unexpected error on idle client", err);
  // Don't exit the process here, just log the error
});

// Create tables if they don't exist
const createTables = () => {
  // Create users table
  const createUsersTable = `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      username VARCHAR(255) UNIQUE NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      img VARCHAR(255),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  // Create posts table
  const createPostsTable = `
    CREATE TABLE IF NOT EXISTS posts (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      content TEXT NOT NULL,
      image VARCHAR(255),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      user_id INT NOT NULL,
      category VARCHAR(100),
      is_published BOOLEAN DEFAULT TRUE,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );
  `;

  // Execute table creation queries
  db.query(createUsersTable, (err, res) => {
    if (err) {
      console.error("Error creating users table:", err);
      return;
    }
    console.log("Users table ready");

    db.query(createPostsTable, (err, res) => {
      if (err) {
        console.error("Error creating posts table:", err);
        return;
      }
      console.log("Posts table ready");
    });
  });
};

createTables();

export default db;
