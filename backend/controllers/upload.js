import { config } from "dotenv";

config();

export const uploadImage = (req, res) => {
  const file = req.file;
  res
    .status(200)
    .json(
      `${process.env.FRONTEND_URL || "http://localhost:5173"}/upload/` +
        file.filename
    );
};
