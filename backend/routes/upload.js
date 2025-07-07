import express from "express";
import { uploadImage } from "../controllers/upload.js";
import multer from "multer";
import { verifyToken } from "../middleware/verifyToken.js";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../frontend/public/upload");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

const router = express.Router();

router.post("/", verifyToken, upload.single("file"), uploadImage);

export default router;
