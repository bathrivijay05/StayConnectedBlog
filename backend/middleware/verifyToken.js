import jwt from "jsonwebtoken";
import { config } from "dotenv";

config();

export const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json("Not Authenticated.");

  jwt.verify(token, process.env.JWT_SECRET || "myjwtkey", (err, data) => {
    if (err) return res.status(403).json("Invalid token");

    req.user = data;
    next();
  });
};
