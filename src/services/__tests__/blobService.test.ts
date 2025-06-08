// External Dependencies
import { put } from '@vercel/blob';

// Internal Dependencies
import { uploadToBlob } from '../blobService';

jest.mock('@vercel/blob', () => ({
  put: jest.fn(),
}));

describe('blobService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('uploadToBlob', () => {
    it('should upload a file to Vercel Blob and return URL info', async () => {
      const mockBlobResponse = {
        url: 'https://example.com/test.pdf',
        pathname: '/test.pdf',
        downloadUrl: 'https://example.com/download/test.pdf',
      };

      (put as jest.Mock).mockResolvedValue(mockBlobResponse);

      const fileName = 'test.pdf';
      const fileBuffer = Buffer.from('test pdf content');

      const result = await uploadToBlob(fileName, fileBuffer);

      expect(put).toHaveBeenCalledWith(fileName, fileBuffer, {
        access: 'public',
        addRandomSuffix: true,
      });

      expect(result).toEqual({
        url: mockBlobResponse.url,
        pathname: mockBlobResponse.pathname,
        downloadUrl: mockBlobResponse.downloadUrl,
      });
    });

    it('should handle errors during upload', async () => {
      const errorMessage = 'Upload failed';
      (put as jest.Mock).mockRejectedValue(new Error(errorMessage));

      const fileName = 'test.pdf';
      const fileBuffer = Buffer.from('test pdf content');

      await expect(uploadToBlob(fileName, fileBuffer)).rejects.toThrow(
        `Failed to upload file: ${errorMessage}`
      );
    });
  });
});
