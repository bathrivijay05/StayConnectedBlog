import db from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { config } from "dotenv";

config();

export const signup = (req, res) => {
  // check if user already exists
  const query = "SELECT * FROM users WHERE email = ? OR username = ?";
  db.query(query, [req.body.email, req.body.username], (err, data) => {
    if (err) return res.status(500).json("Something went wrong");
    if (data.length) return res.status(409).json("User already exists.");

    // hashing password
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    // creating new user
    const query =
      "INSERT INTO users(username, email, password) values (?, ?, ?)";
    db.query(query, [req.body.username, req.body.email, hash], (err, data) => {
      if (err) return res.status(500).json("Something went wrong");
      return res.json("User has been created.");
    });
  });
};

export const login = (req, res) => {
  // check user exists
  const query = "SELECT * FROM users WHERE username = ?";
  db.query(query, [req.body.username], (err, data) => {
    if (err) return res.status(500).json("Something went wrong");
    if (data.length === 0) return res.status(404).json("User not found.");

    // check if password is correct
    const isValidPassword = bcrypt.compareSync(
      req.body.password,
      data[0].password
    );

    if (!isValidPassword) return res.status(400).json("Invalid password.");

    const token = jwt.sign(
      { id: data[0].id },
      process.env.JWT_SECRET || "myjwtkey"
    );

    const { password, ...other } = data[0];

    res.cookie("token", token).status(200).json(other);
  });
};

export const logout = (req, res) => {
  res
    .clearCookie("token", {
      httpOnly: true,
    })
    .status(200)
    .json("User has been logged out.");
};
