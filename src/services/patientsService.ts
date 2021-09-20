import patients from '../../data/patients';
import { NewPatient, NonSensitivePatient, Patient, EntryWithoutId, Entry } from '../types';
import {v1 as uuid} from 'uuid';

const getPatients = (): Array<Patient> => {
  return patients;
};

const getPatient = (id: string): Array<Patient> => {
  return patients.filter(p => p.id === id);
};

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const addPatients = (patient: NewPatient): Patient => {
  const newPatient = {
    id: uuid(),
    entries: [],
    ...patient
  };

  patients.push(newPatient);
  return newPatient;
};

const addEntry = (patient: Patient, entry: EntryWithoutId): Entry => {
  const newEntry = {
    id: uuid(),
    ...entry
  };
  patient.entries.push(newEntry);
  return newEntry;
};

export default {
  getPatients,
  getPatient,
  addPatients,
  getNonSensitivePatients,
  addEntry
};