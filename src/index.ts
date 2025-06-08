// External Dependencies
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
// Load env
dotenv.config();

// Import routes
import pdfRoutes from './routes/pdfRoutes';

// Init app
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// API routes
app.use('/api', pdfRoutes);

// Catch-all for 404s
app.use('*', (_req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`PDF2JSON API started on port ${PORT}`);
});
