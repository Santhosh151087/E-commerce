// Multer is a Node.js middleware used for handling multipart/form-data.

// It is mainly used for:

// File uploads
// Image uploads
// PDF uploads
// Form data with files

import multer from "multer";

// Creates storage settings for uploaded files.
// Store files physically in your system storage.
const storage = multer.diskStorage({
    // Sets uploaded file name.
  filename: function (req, file, callback) {
    // Sets uploaded file name.
    callback(null, file.originalname);
  },
});

const upload = multer({
  storage,
});

export default upload;

// Receives file from frontend
// Stores the file
// Keeps original file name
// Makes uploaded file available in: