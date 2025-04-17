import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadPath = path.join(__dirname, "../uploads/files");
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        const sanitizedFileName = file.originalname
            ? file.originalname.replace(/[^a-zA-Z0-9.]/g, "_")
            : `file_${Date.now()}`;
        cb(null, sanitizedFileName);
    }
});

const upload = multer({ storage: storage });

export default upload;