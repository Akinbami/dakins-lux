import multer from "multer";
import multerS3 from "multer-s3";
import s3Config from "../config/aws.js";

export const handleMulterError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    let errorMessage = err.message;

    if (err.code === "LIMIT_UNEXPECTED_FILE") {
      errorMessage = "Too many files uploaded for one or more fields.";
    }

    res.status(400).json({ success: false, message: errorMessage });
  } else if (err) {
    res.status(500).json({ success: false, message: err.message });
  } else {
    next();
  }
};

// File type validation (optional)
const fileFilter = (req, file, callback) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
  if (allowedTypes.includes(file.mimetype)) {
    callback(null, true); // Accept file
  } else {
    callback(
      new Error("Invalid file type. Only JPEG, PNG, and GIF are allowed."),
      false
    );
  }
};

const storage = multer.diskStorage({
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  },
});

const upload = multer({
  storage: multerS3({
    s3: s3Config,
    bucket: process.env.AWS_S3_BUCKET,
    key: function (req, file, cb) {
      cb(null, Date.now() + "-" + file.originalname);
    },
  }),
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB
    files: 4,
  },
});

export default upload;
