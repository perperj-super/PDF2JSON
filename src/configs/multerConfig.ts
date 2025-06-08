// External Dependencies
import multer from 'multer';

export const pdfUpload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (_req, file, cb) => {
    const isPdf = file.mimetype === 'application/pdf';

    if (isPdf) {
      cb(null, true);
    } else {
      cb(new Error('Sorry, only PDF files are accepted'));
    }
  },
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
});
