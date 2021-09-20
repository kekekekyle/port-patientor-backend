import express from 'express';
import disagnosesService from '../services/disagnosesService';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(disagnosesService.getDiagnoses());
});

router.post('/', (_req, res) => {
  res.send('Saving a diagnoses!');
});

export default router;