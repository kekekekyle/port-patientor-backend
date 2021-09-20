import express from 'express';
import patientsService from '../services/patientsService';
import { toNewPatient, toNewEntry } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientsService.getNonSensitivePatients());
});

router.get('/:id', (req, res) => {
  res.send(patientsService.getPatient(req.params.id));
});

router.post('/', (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);

    const addedPatient = patientsService.addPatients(newPatient);
    res.json(addedPatient);
  } catch (e) {
    res.status(400).send((e as Error).message);
  }
});

router.post('/:id/entries', (req, res) => {
  try {
    const patient = patientsService.getPatient(req.params.id);
    const newEntry = toNewEntry(req.body);

    const addedEntry = patientsService.addEntry(patient[0], newEntry);
    res.json(addedEntry);
  } catch (e) {
    res.status(400).send((e as Error).message);
  }
});

export default router;