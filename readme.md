# PDF2JSON

A Node.js service that converts PDF documents to structured JSON using OpenAI's GPT models.

## Tech Stack

- Node.js
- Express
- Typescript
- PDF-Parse
- Vercel/Blob
- OpenAI
- Jest
- Supertest
- EsLint
- Prettier
- Husky

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- OpenAI API key
- Vercel Blob Storage credentials (if using storage features)

### Installation

1. Clone the repository:

   ```bash
   git clone git@github.com:edwardliu92/PDF2JSON.git
   cd pdf2json
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Copy `.env.exxample` and rename it to `.env`

4. Build the project:

   ```bash
   npm run build
   ```

5. Start the server:
   ```bash
   npm start
   ```

## API Endpoints

### Upload and Process PDF

**POST** `/api/process-pdf`

Uploads a PDF file, extracts text content, and uses OpenAI to convert it to structured JSON.

**Request:**

- Content-Type: multipart/form-data
- Body: PDF file in the field 'pdf'

**Response:**

```json
{
  "success": true,
  "message": "PDF processed successfully",
  "data": {
    // Structured JSON representation of the PDF content
  }
}
```

## Development

Run the development server with hot reload:

```bash
npm run dev
```

### Testing

Run tests:

```bash
npm test
```

Run tests with coverage:

```bash
npm run test:coverage
```

## Improvements

### Communication between Async services

- It would be better to setup a messaging queues to implement flexble communication between services.
- Needs to implement detailed error handling when the communication between async operations become complex and detailed.
- Improve the quality of extracing the PDF content can be done by using `Grobid`. Need to run docker image for this service and call it to extract better content rather than `pdf-parse`.
