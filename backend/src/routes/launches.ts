import { Router, Request, Response } from 'express';
import { spacexService } from '../services/spacexService';
import { LaunchResponse } from '../types/spacex';

const router = Router();

// GET /api/launches — all launches
router.get('/', async (_req: Request, res: Response) => {
  try {
    const launches = await spacexService.getAllLaunches();
    const mapped: LaunchResponse[] = launches.map((l) => ({
      id: l.id,
      name: l.name,
      date_utc: l.date_utc,
      date_unix: l.date_unix,
      success: l.success,
      upcoming: l.upcoming,
      details: l.details,
      flight_number: l.flight_number,
      rocket_id: l.rocket,
      links: l.links,
      cores: l.cores,
      payloads: l.payloads,
      launchpad: l.launchpad,
      failures: l.failures,
    }));
    res.json(mapped);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch launches' });
  }
});

// GET /api/launches/:id — single launch with rocket details
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const launch = await spacexService.getLaunchById(req.params.id);

    // Rocket ID may be null on some launches — fetch only if present
    let rocket = undefined;
    if (launch.rocket) {
      try {
        rocket = await spacexService.getRocketById(launch.rocket);
      } catch (rocketErr) {
        console.warn(`Could not fetch rocket ${launch.rocket}:`, rocketErr);
      }
    }

    const response: LaunchResponse = {
      id: launch.id,
      name: launch.name,
      date_utc: launch.date_utc,
      date_unix: launch.date_unix,
      success: launch.success,
      upcoming: launch.upcoming,
      details: launch.details,
      flight_number: launch.flight_number,
      rocket_id: launch.rocket,
      rocket,
      links: launch.links,
      cores: launch.cores,
      payloads: launch.payloads,
      launchpad: launch.launchpad,
      failures: launch.failures,
    };

    res.json(response);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error(`[launches/:id] Error for id=${req.params.id}:`, message);
    res.status(500).json({ error: 'Failed to fetch launch details', detail: message });
  }
});

export default router;
