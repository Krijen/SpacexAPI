import axios from 'axios';
import { SpaceXLaunch, SpaceXRocket } from '../types/spacex';

const SPACEX_API = 'https://api.spacexdata.com/v5';

export const spacexService = {
  async getAllLaunches(): Promise<SpaceXLaunch[]> {
    const res = await axios.post(`${SPACEX_API}/launches/query`, {
      query: {},
      options: {
        limit: 200,
        sort: { date_utc: 'desc' },
      },
    });
    return res.data.docs;
  },

  async getLaunchById(id: string): Promise<SpaceXLaunch> {
    const res = await axios.get(`${SPACEX_API}/launches/${id}`);
    return res.data;
  },

  async getRocketById(id: string): Promise<SpaceXRocket> {
    const res = await axios.get(`${SPACEX_API}/rockets/${id}`);
    return res.data;
  },

  async getAllRockets(): Promise<SpaceXRocket[]> {
    const res = await axios.get(`${SPACEX_API}/rockets`);
    return res.data;
  },
};
