import express from "express";
import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/users.js";
import authRoutes from "./routes/auth.js";
import uploadRoutes from "./routes/upload.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import { config } from "dotenv";

config();

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());

app.use(express.json());
app.use("/api/posts/", postRoutes);
app.use("/api/users/", userRoutes);
app.use("/api/auth/", authRoutes);
app.use("/api/upload", uploadRoutes);

// Error handling middleware for multer and other errors
app.use((err, req, res, next) => {
  if (err) {
    // Multer file size error
    if (err.code === "LIMIT_FILE_SIZE") {
      return res
        .status(400)
        .json({ error: "File size too large. Maximum size is 5MB." });
    }
    // Multer file type error
    if (err.message && err.message.includes("Invalid file type")) {
      return res.status(400).json({ error: err.message });
    }
    // General error
    console.error("Error:", err);
    return res
      .status(500)
      .json({ error: err.message || "Something went wrong!" });
  }
  next();
});

app.listen(process.env.PORT || 8080, () => {
  console.log(`Server running on port : ${process.env.PORT}`);
});
