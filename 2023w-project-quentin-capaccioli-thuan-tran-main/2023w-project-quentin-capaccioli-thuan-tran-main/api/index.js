// Importing required modules
import express from "express";
const app = express();
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import commentRoutes from "./routes/comments.js";
import likeRoutes from "./routes/likes.js";
import relationshipRoutes from "./routes/relationships.js";
import cors from "cors";
import multer from "multer";
import cookieParser from "cookie-parser";

// Middleware to set CORS headers and allow credentials
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

// Middleware to parse JSON request bodies
app.use(express.json());

// Middleware to handle CORS and specify allowed origin
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

// Middleware to parse cookies
app.use(cookieParser());

// Configuring multer for file uploads
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Utilisez __dirname pour obtenir le chemin absolu du dossier actuel et naviguez au dossier 'upload'
    const uploadPath = path.join(__dirname, "..", "client", "public", "upload");
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage: storage });

// Route to handle file uploads
app.post("/api/upload", upload.single("file"), (req, res) => {
  const file = req.file;
  // Respond with the filename of the uploaded file
  res.status(200).json(file.filename);
});

// Routes for different parts of the API
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/likes", likeRoutes);
app.use("/api/relationships", relationshipRoutes);

// Start the server on port 8800
app.listen(8800, () => {
  console.log("API working!");
});

import fs from "fs";

import { fileURLToPath } from "url";

// Convert file URL to path using fileURLToPath
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Use __dirname to go to the path of the folder upload
const uploadDir = path.join(__dirname, "..", "client", "public", "upload");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
  console.log(`Le répertoire ${uploadDir} a été créé.`);
}
