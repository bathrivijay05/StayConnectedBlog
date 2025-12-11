import db from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { config } from "dotenv";

config();

export const signup = (req, res) => {
  // check if user already exists
  const query = "SELECT * FROM users WHERE email = $1 OR username = $2";
  db.query(query, [req.body.email, req.body.username], (err, data) => {
    if (err) return res.status(500).json("Something went wrong");
    if (data.rows.length) return res.status(409).json("User already exists.");

    // hashing password
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    // creating new user
    const query =
      "INSERT INTO users(username, email, password) values ($1, $2, $3)";
    db.query(query, [req.body.username, req.body.email, hash], (err, data) => {
      if (err) return res.status(500).json("Something went wrong");
      return res.json("User has been created.");
    });
  });
};

export const login = (req, res) => {
  // check user exists
  const query = "SELECT * FROM users WHERE username = $1";
  db.query(query, [req.body.username], (err, data) => {
    if (err) return res.status(500).json("Something went wrong");
    if (data.rows.length === 0) return res.status(404).json("User not found.");

    // check if password is correct
    const isValidPassword = bcrypt.compareSync(
      req.body.password,
      data.rows[0].password
    );

    if (!isValidPassword) return res.status(400).json("Invalid password.");

    const token = jwt.sign(
      { id: data.rows[0].id },
      process.env.JWT_SECRET || "myjwtkey"
    );

    const { password, ...other } = data.rows[0];

    const isProduction = process.env.VERCEL;

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "none" : "lax",
      })
      .status(200)
      .json(other);
  });
};

export const logout = (req, res) => {
  const isProduction = process.env.VERCEL;

  res
    .clearCookie("token", {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
    })
    .status(200)
    .json("User has been logged out.");
};
