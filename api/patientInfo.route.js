// patientInfo.route.js
import express from 'express';
import { getPatientSummaryByType } from '../dao/patientInfo.dao.js';

const router = express.Router();

router.get('/patient/summary/:type', async (req, res) => {
  try {
    const { type } = req.params;
    const summary = await getPatientSummaryByType(type);

    if (!summary) {
      return res.status(404).json({ error: 'No data found' });
    }

    res.json(summary);
  } catch (err) {
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});

export default router;
