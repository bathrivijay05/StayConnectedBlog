import { config } from "dotenv";

config();

export const uploadImage = (req, res) => {
  // Check if file was uploaded
  if (!req.file) {
    return res
      .status(400)
      .json({ error: "No file uploaded or invalid file type." });
  }

  const file = req.file;

  // Additional validation: check file extension
  const allowedExtensions = [".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg"];
  const fileExtension = file.originalname
    .toLowerCase()
    .slice(file.originalname.lastIndexOf("."));

  if (!allowedExtensions.includes(fileExtension)) {
    return res
      .status(400)
      .json({ error: "Invalid file extension. Only image files are allowed." });
  }

  // Return only the relative path without the full URL
  res.status(200).json(`/upload/${file.filename}`);
};
