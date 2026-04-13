import { Router, Request, Response } from 'express';
import { spacexService } from '../services/spacexService';

const router = Router();

// GET /api/rockets
router.get('/', async (_req: Request, res: Response) => {
  try {
    const rockets = await spacexService.getAllRockets();
    res.json(rockets);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch rockets' });
  }
});

// GET /api/rockets/:id
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const rocket = await spacexService.getRocketById(req.params.id);
    res.json(rocket);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch rocket' });
  }
});

export default router;
