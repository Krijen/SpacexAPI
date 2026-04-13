import express from 'express';
import cors from 'cors';
import launchRoutes from './routes/launches';
import rocketRoutes from './routes/rockets';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use('/api/launches', launchRoutes);
app.use('/api/rockets', rocketRoutes);

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`🚀 SpaceX API server running on http://localhost:${PORT}`);
});

export default app;
