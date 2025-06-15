//so I can build body form
const multer = require('multer');

// No file uploads, so use memory storage
const upload = multer();

module.exports = upload.none(); // Accept only text fields (no files)
