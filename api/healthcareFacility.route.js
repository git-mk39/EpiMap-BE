// Route Layer (ESM)

import express from 'express';
import { getAllFacilities } from '../dao/healthcareFacility.dao.js';

const router = express.Router();

router.get('/facilities', async (req, res) => {
  try {
    const facilities = await getAllFacilities();
    res.json(facilities);
  } catch (err) {
    console.error('Error fetching facilities:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
