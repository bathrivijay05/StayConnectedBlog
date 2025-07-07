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

app.listen(process.env.PORT || 8080, () => {
  console.log(`Server running on port : ${process.env.PORT}`);
});
