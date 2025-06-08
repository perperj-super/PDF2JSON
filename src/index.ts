// External Dependencies
import express, { Express } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

// Import Routes
import pdfRoutes from './routes/pdfRoutes';

// Load Dev-Env
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Routes Configuration
app.use('/api', pdfRoutes);

// Health-Check
app.get('/', (req, res) => {
  res.send('Server is running!');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

export default app;
