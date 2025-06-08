// Internal Dependencies
jest.mock('../openaiService');
import { extractJsonFromText } from '../openaiService';

describe('openaiService', () => {
  describe('extractJsonFromText', () => {
    it('should extract JSON from text content', async () => {
      const result = await extractJsonFromText('Some PDF text content');

      expect(result).toEqual({
        title: 'Test Document',
        content: 'This is the content',
      });

      expect(extractJsonFromText).toHaveBeenCalledWith('Some PDF text content');
    });
  });
});
