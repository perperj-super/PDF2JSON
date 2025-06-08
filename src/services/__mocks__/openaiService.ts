export const createOpenAIClient = jest.fn();

export const extractJsonFromText = jest.fn().mockImplementation((pdfText: string) => {
  return Promise.resolve({
    title: 'Test Document',
    content: 'This is the content',
  });
});
