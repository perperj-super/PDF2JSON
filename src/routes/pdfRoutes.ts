// External Dependencies
import express, { Request, Response } from 'express';

// Internal Dependencies
import { uploadToBlob } from '../services/blobService';
import { pdfUpload } from '../configs/multerConfig';

const router = express.Router();

/**
 * @route POST /api/process-pdf
 * @desc Upload a PDF and return the JSON structure of the PDF
 */
router.post('/process-pdf', pdfUpload.single('pdf'), async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No PDF is uploaded',
      });
    }

    const blobData = await uploadToBlob(req.file.originalname, req.file.buffer);

    return res.status(200).json({
      success: true,
      message: 'PDF uploaded successfully',
      data: blobData,
    });
  } catch (error) {
    console.error('Error processing PDF:', error);
    return res.status(500).json({
      success: false,
      message: 'Error processing PDF document',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

export default router;
