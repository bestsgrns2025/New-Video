// server.ts (TypeScript-ready version)

// Load environment variables
import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoutes from './routes/auth.routes';

const app = express();

// ---------------------- CORS Setup ----------------------
const allowedOrigins = [
  process.env.FRONTEND_URL || 'http://localhost:5173', // Local dev + deployed frontend
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (mobile apps, curl, Postman)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error('❌ Not allowed by CORS'));
      }
    },
    credentials: true,
  })
);

// ---------------------- Middleware ----------------------
app.use(express.json());

// ---------------------- Routes ----------------------
app.get('/', (_req, res) => {
  res.send('Server is running!');
});

// Test MongoDB connection
app.get('/test-db', async (_req, res) => {
  try {
    const db = mongoose.connection.db;
    const collections = await db.listCollections().toArray();
    res.json({ collections });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Auth routes
app.use('/api/auth', authRoutes);

// ---------------------- Server & DB ----------------------
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error(
    '❌ MONGO_URI is missing! Set it in Render Environment Variables or local .env file.'
  );
  process.exit(1);
}

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected successfully');
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
  });

// ---------------------- Debug Env ----------------------
console.log('🔹 Loaded Environment Variables:');
console.log({
  PORT: process.env.PORT,
  MONGO_URI: MONGO_URI ? 'Loaded ✅' : 'Missing ❌',
  JWT_SECRET: process.env.JWT_SECRET ? 'Loaded ✅' : 'Missing ❌',
  FRONTEND_URL: process.env.FRONTEND_URL || 'Not Set',
  EMAIL_HOST: process.env.EMAIL_HOST || 'Not Set',
  EMAIL_USER: process.env.EMAIL_USER || 'Not Set',
});
