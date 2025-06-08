// External Dependencies
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_KEY,
});

export const extractJsonFromText = async (pdfText: string): Promise<any> => {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content:
            "You are an expert at converting document text into structured JSON. Extract all key information from the text and organize it in a clean, structured JSON format. Include all relevant fields and maintain the document's structure in your JSON output.",
        },
        {
          role: 'user',
          content: `Extract the structured data from this PDF text content and return it as valid JSON:\n\n${pdfText}`,
        },
      ],
      temperature: 0.3,
      response_format: { type: 'json_object' },
    });

    const jsonContent = response.choices[0].message.content;

    return jsonContent ? JSON.parse(jsonContent) : null;
  } catch (error) {
    console.error('Error extracting JSON from text:', error);
    throw new Error('Failed to extract structured data from PDF text');
  }
};
