// dailyReport.route.js
import express from 'express';
import { getLatestReportByProvinceAndType, getTop5ByInfectionsLatestDate, getNationalStats, get10MostRecent} from '../dao/dailyReport.dao.js';

const router = express.Router();

router.get('/report/latest/:province/:type', async (req, res) => {
  try {
    const { province, type } = req.params;
    const data = await getLatestReportByProvinceAndType(province, type);
    if (!data) {
      res.status(404).json({ error: 'No data found for given province and type' });
    } else {
      res.json(data);
    }
  } catch (err) {
    res.status(500).json({ error: 'Server Error', details: err.message });
  }
});

router.get('/report/top5/:type', async (req, res) => {
  try {
    const { type } = req.params;
    const data = await getTop5ByInfectionsLatestDate(type);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});

router.get('/report/totals/:type', async (req, res) => {
  try {
    const { type } = req.params;
    const data = await getNationalStats(type);

    if (!data) {
      return res.status(404).json({ error: 'No data found for given type' });
    }

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});

router.get('/report/recent/:province/:type', async (req, res) => {
  try {
    const { province, type } = req.params;
    const data = await get10MostRecent(province, type);

    if (!data || data.length === 0) {
      return res.status(404).json({ error: 'No data found' });
    }

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});

export default router;
