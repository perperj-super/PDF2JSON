// External Dependencies
import axios from 'axios';
import pdfParse from 'pdf-parse';

// Internal Dependencies
import { extractPdfContent } from '../pdfService';

jest.mock('axios');
jest.mock('pdf-parse');

describe('pdfService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('extractPdfContent', () => {
    it('should extract text content from a PDF URL', async () => {
      const mockPdfUrl = 'https://example.com/test.pdf';
      const mockArrayBuffer = Buffer.from('mock pdf content');
      const mockPdfText = 'This is the extracted text from the PDF';

      (axios.get as jest.Mock).mockResolvedValue({
        data: mockArrayBuffer,
      });

      (pdfParse as jest.Mock).mockResolvedValue({
        text: mockPdfText,
        numpages: 1,
        numrender: 1,
        info: {},
        metadata: {},
        version: '1.0',
      });

      const result = await extractPdfContent(mockPdfUrl);

      expect(axios.get).toHaveBeenCalledWith(mockPdfUrl, {
        responseType: 'arraybuffer',
        timeout: 15000,
      });

      expect(pdfParse).toHaveBeenCalledWith(mockArrayBuffer);

      expect(result).toBe(mockPdfText.replace(/\s+/g, ' ').trim());
    });

    it('should handle empty text from PDF parser', async () => {
      const mockPdfUrl = 'https://example.com/empty.pdf';

      (axios.get as jest.Mock).mockResolvedValue({
        data: Buffer.from('empty pdf'),
      });

      (pdfParse as jest.Mock).mockResolvedValue({
        text: '',
        numpages: 1,
        numrender: 0,
        info: {},
        metadata: {},
        version: '1.0',
      });

      const result = await extractPdfContent(mockPdfUrl);

      expect(result).toBe('');
    });

    it('should handle errors during PDF extraction', async () => {
      const mockPdfUrl = 'https://example.com/error.pdf';
      const errorMessage = 'Failed to parse PDF';

      (axios.get as jest.Mock).mockResolvedValue({
        data: Buffer.from('error pdf'),
      });

      (pdfParse as jest.Mock).mockRejectedValue(new Error(errorMessage));

      await expect(extractPdfContent(mockPdfUrl)).rejects.toThrow(
        'Could not extract text from PDF - try a different file?'
      );
    });
  });
});
