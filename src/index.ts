import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { logger } from './utils/logger';
import { errorHandler } from './middleware/errorHandler';
import { bundlerRoutes } from './routes/bundler.routes';
import { healthRoutes } from './routes/health.routes';
import { BundlerBot } from './services/bundler.service';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3004;

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/health', healthRoutes);
app.use('/api/bundler', bundlerRoutes);

app.use(errorHandler);

const bundlerBot = new BundlerBot();

app.listen(PORT, () => {
  logger.info(`📦 Bundler Bot server running on port ${PORT}`);
  
  if (process.env.BUNDLER_ENABLED === 'true') {
    bundlerBot.start().catch((error) => {
      logger.error('Failed to start bundler bot:', error);
    });
  }
});

process.on('SIGTERM', () => {
  logger.info('SIGTERM received, shutting down gracefully');
  bundlerBot.stop();
  process.exit(0);
});

process.on('SIGINT', () => {
  logger.info('SIGINT received, shutting down gracefully');
  bundlerBot.stop();
  process.exit(0);
});

export default app;

