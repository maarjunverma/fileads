import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import axios from 'axios';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

  // Request logger
  app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
  });

  // API Routes
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // Handle both /api/finleads and /api/finleads/
  app.post(['/api/finleads', '/api/finleads/'], async (req, res) => {
    try {
      const body = req.body;
      console.log("Lead:", body);

      const { name, email, phone, service, message } = body;

      if (!name || !email || !phone) {
        return res.status(400).json({ error: 'Name, email, and phone are required.' });
      }

      const leadData = {
        name,
        email,
        phone,
        service,
        message,
        timestamp: new Date().toISOString(),
      };
      // Save to Strapi (if configured)
      if (process.env.STRAPI_URL && process.env.STRAPI_API_TOKEN) {
        try {
          await axios.post(
            `${process.env.STRAPI_URL}/api/finleads`,
            { data: leadData },
            {
              headers: {
                Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
              },
            }
          );
          console.log('Lead saved to Strapi');
        } catch (error: any) {
          const strapiError = error.response?.data?.error || error.message;
          console.error('Error saving to Strapi:', strapiError);
          // Detailed logging for debugging 400 errors
          if (error.response?.status === 400) {
            console.error('Strapi Validation Details:', JSON.stringify(error.response.data, null, 2));
          }
        }
      }

      // Trigger n8n Webhook (if configured)
      if (process.env.N8N_WEBHOOK_URL) {
        try {
          await axios.post(process.env.N8N_WEBHOOK_URL, leadData);
          console.log('n8n trigger sent');
        } catch (error: any) {
          console.error('Error triggering n8n:', error.response?.status === 404 ? '404 Not Found - Please check your n8n Webhook URL' : error.message);
        }
      }

      res.status(200).json({ success: true });
    } catch (error) {
      console.error('General error processing lead:', error);
      res.status(500).json({ error: 'Failed' });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
