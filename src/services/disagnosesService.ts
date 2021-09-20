import diagnoses from '../../data/diagnoses';
import { Diagnosis } from '../types';

const getDiagnoses = (): Array<Diagnosis> => {
  return diagnoses;
};

const addDiagnoses = () => {
  return null;
};

export default {
  getDiagnoses,
  addDiagnoses
};