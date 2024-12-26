import multer from 'multer';

// Set up multer to handle file uploads
const storage = multer.memoryStorage(); // Store files in memory

const upload = multer({ storage });

export default upload;
