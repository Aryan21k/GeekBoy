const multer = require('multer');

// Define storage for multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/') // Uploads folder where files will be stored
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname) // Keep original file name
    }
});

// Initialize multer instance
const upload = multer({ storage: storage });

// Function to handle file upload
function uploadFile(req, res) {
    // Access uploaded file details
    const fileName = req.file.originalname;
    // Handle file upload logic (e.g., save to database, respond to client)
    res.send('File uploaded successfully: ' + fileName);
}

module.exports = { upload, uploadFile };
