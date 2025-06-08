// External Dependencies
import multer from 'multer';

export const pdfUpload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (_req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF file type is allowed'));
    }
  },
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
});
