// dailyReport.route.js
import express from 'express';
import { getLatestReportByProvinceAndType } from '../dao/dailyReport.dao.js';

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

export default router;
