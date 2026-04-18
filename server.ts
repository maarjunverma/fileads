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
  console.log('--- Starting Express Server ---');
  const app = express();
  const PORT = 3000;

  app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Request logger
  app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
  });

  // API Routes
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString(), env: process.env.NODE_ENV });
  });

  app.get('/api/env-check', (req, res) => {
    res.json({
      strapiConfigured: !!(process.env.STRAPI_URL && process.env.STRAPI_API_TOKEN),
      n8nConfigured: !!process.env.N8N_WEBHOOK_URL,
      strapiUrlSet: !!process.env.STRAPI_URL,
      strapiTokenSet: !!process.env.STRAPI_API_TOKEN,
    });
  });

  // Most robust way to handle the finleads endpoint
  const handleFinLeads = async (req: express.Request, res: express.Response) => {
    console.log(`[API] Processing ${req.method} /api/finleads`);
    const { name, email, phone, service, message } = req.body;

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

    try {
      // Save to Strapi (if configured)
      const strapiUrl = process.env.STRAPI_URL?.replace(/\/$/, '');
      if (strapiUrl && process.env.STRAPI_API_TOKEN) {
        try {
          await axios.post(
            `${strapiUrl}/api/leads`,
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
        }
      }

      // Trigger n8n Webhook (if configured)
      if (process.env.N8N_WEBHOOK_URL) {
        try {
          await axios.post(process.env.N8N_WEBHOOK_URL, leadData);
          console.log('n8n trigger sent');
        } catch (error: any) {
          console.error('Error triggering n8n:', error.message);
        }
      }

      res.status(200).json({ status: 'success', message: 'Lead received successfully' });
    } catch (error) {
      console.error('General error processing lead:', error);
      res.status(500).json({ error: 'Failed to process lead' });
    }
  };

  // Handle finleads with multiple paths and methods to be bulletproof
  app.all(['/api/finleads', '/api/finleads/'], (req, res, next) => {
    if (req.method === 'OPTIONS') {
      return res.sendStatus(200);
    }
    if (req.method === 'POST') {
      return handleFinLeads(req, res);
    }
    if (req.method === 'GET') {
      return res.json({ message: 'FinLeads API is ready for POST requests' });
    }
    next();
  });

  // Catch-all for /api routes to prevent falling through to Vite
  app.all('/api/*', (req, res) => {
    console.log(`[API 404] ${req.method} ${req.url} - No route found`);
    res.status(404).json({ error: `Route ${req.method} ${req.url} not found` });
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
