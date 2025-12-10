import express from "express";
import { uploadImage } from "../controllers/upload.js";
import multer from "multer";
import { verifyToken } from "../middleware/verifyToken.js";

const storage = multer.memoryStorage();

// File filter to accept only images
const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/gif",
    "image/webp",
    "image/svg+xml",
  ];

  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true); // Accept file
  } else {
    cb(
      new Error(
        "Invalid file type. Only image files (jpg, jpeg, png, gif, webp, svg) are allowed."
      ),
      false
    );
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
});

const router = express.Router();

router.post("/", verifyToken, upload.single("file"), uploadImage);

export default router;
