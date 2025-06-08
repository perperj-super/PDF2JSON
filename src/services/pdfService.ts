// External Dependencies
import axios from 'axios';
import pdfParse from 'pdf-parse';

export const extractPdfContent = async (pdfUrl: string): Promise<string> => {
  try {
    const response = await axios.get(pdfUrl, {
      responseType: 'arraybuffer',
      timeout: 15000,
    });

    const pdfData = await pdfParse(response.data);

    const text = (pdfData.text || '').replace(/\s+/g, ' ').trim();

    return text;
  } catch (error) {
    console.error('PDF extraction failed:', error);
    throw new Error('Could not extract text from PDF - try a different file?');
  }
};
