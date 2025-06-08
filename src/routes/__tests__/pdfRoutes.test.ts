// External Dependencies
import request from 'supertest';
import express, { Request, Response, NextFunction } from 'express';

// Internal Dependencies
import { uploadToBlob } from '../../services/blobService';
import { extractPdfContent } from '../../services/pdfService';
import { extractJsonFromText } from '../../services/openaiService';
import pdfRoutes from '../pdfRoutes';

// Mock the services
jest.mock('../../services/blobService');
jest.mock('../../services/pdfService');
jest.mock('../../services/openaiService');

// Mock multer config with test.pdf file
jest.mock('../../configs/multerConfig', () => ({
  pdfUpload: {
    single: () => (req: Request, res: Response, next: NextFunction) => {
      req.file = {
        originalname: 'test.pdf',
        buffer: Buffer.from('test pdf content'),
      } as Express.Multer.File;
      next();
    },
  },
}));

describe('PDF Routes', () => {
  let app: express.Express;

  beforeEach(() => {
    jest.clearAllMocks();

    app = express();
    app.use(express.json());
    app.use('/api', pdfRoutes);
  });

  describe('POST /api/process-pdf', () => {
    it('should process a PDF and return JSON data', async () => {
      const mockBlobData = {
        url: 'https://example.com/test.pdf',
        pathname: '/test.pdf',
        downloadUrl: 'https://example.com/download/test.pdf',
      };

      const mockPdfText = 'Extracted text from PDF';

      const mockJsonData = {
        title: 'Test Document',
        content: 'This is the content',
      };

      (uploadToBlob as jest.Mock).mockResolvedValue(mockBlobData);
      (extractPdfContent as jest.Mock).mockResolvedValue(mockPdfText);
      (extractJsonFromText as jest.Mock).mockResolvedValue(mockJsonData);

      const response = await request(app)
        .post('/api/process-pdf')
        .set('Content-Type', 'multipart/form-data');

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        success: true,
        message: 'PDF processed successfully',
        data: mockJsonData,
      });

      expect(uploadToBlob).toHaveBeenCalled();
      expect(extractPdfContent).toHaveBeenCalledWith(mockBlobData.url);
      expect(extractJsonFromText).toHaveBeenCalledWith(mockPdfText);
    });

    it('should return error when no file is uploaded', async () => {
      jest.mock(
        '../../configs/multerConfig',
        () => ({
          pdfUpload: {
            single: () => (req: Request, res: Response, next: NextFunction) => {
              next();
            },
          },
        }),
        { virtual: true }
      );

      jest.resetModules();
      const freshPdfRoutes = require('../pdfRoutes').default;

      const testApp = express();
      testApp.use('/api', freshPdfRoutes);

      const response = await request(testApp)
        .post('/api/process-pdf')
        .set('Content-Type', 'multipart/form-data');

      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        success: false,
        message: 'No PDF is uploaded',
      });
    });

    it('should handle service errors', async () => {
      const errorMessage = 'Service error';
      (uploadToBlob as jest.Mock).mockRejectedValue(new Error(errorMessage));

      const response = await request(app)
        .post('/api/process-pdf')
        .set('Content-Type', 'multipart/form-data');

      expect(response.status).toBe(500);
      expect(response.body).toEqual({
        success: false,
        message: 'Error processing PDF document',
        error: errorMessage,
      });
    });
  });
});
