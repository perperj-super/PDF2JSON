const pdfParse = jest.fn().mockImplementation((dataBuffer) => {
  return Promise.resolve({
    text: 'This is mock PDF text for testing',
    numpages: 1,
    numrender: 1,
    info: {},
    metadata: {},
    version: '1.0',
  });
});

export default pdfParse;
