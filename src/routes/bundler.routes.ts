import { Router, Request, Response } from 'express';
import { BundlerBot } from '../services/bundler.service';

const router = Router();
const bundlerBot = new BundlerBot();

router.get('/status', (req: Request, res: Response) => {
  try {
    const status = bundlerBot.getStatus();
    res.json({ success: true, data: status });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to get status' });
  }
});

router.post('/bundle', async (req: Request, res: Response) => {
  try {
    const { transactions } = req.body;
    const result = await bundlerBot.createBundle(transactions);
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to create bundle' });
  }
});

router.get('/bundles', (req: Request, res: Response) => {
  try {
    const bundles = bundlerBot.getBundleHistory();
    res.json({ success: true, data: bundles });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to get bundles' });
  }
});

export { router as bundlerRoutes };

