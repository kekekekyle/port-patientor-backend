import { NewPatient, Gender, HealthCheckRating, Discharge, SickLeave, EntryWithoutId } from './types';

type PatientFields = { 
  name: unknown, 
  dateOfBirth: unknown, 
  ssn: unknown, 
  gender: unknown, 
  occupation: unknown, 
  entries: unknown[] 
};

export const toNewPatient = ({ name, dateOfBirth, ssn, gender, occupation }: PatientFields): NewPatient => {
  const newPatient: NewPatient = {
    name: parseName(name),
    dateOfBirth: parseDateOfBirth(dateOfBirth),
    ssn: parseSsn(ssn),
    gender: parseGender(gender),
    occupation: parseOccupation(occupation)
  };
  return newPatient;
};

type EntryFields = {
  type: unknown,
  description: unknown, 
  date: unknown, 
  specialist: unknown, 
  diagnosisCodes?: unknown[],
  healthCheckRating?: unknown,
  discharge?: unknown,
  employerName?: unknown,
  sickLeave?: unknown
};

export const toNewEntry = ({ type, description, date, specialist, diagnosisCodes, healthCheckRating, discharge, employerName, sickLeave }: EntryFields): EntryWithoutId => {
  const newType = parseType(type);
  
  const newBaseEntry = {
    description: parseString(description),
    date: parseDate(date),
    specialist: parseString(specialist),
    diagnosisCodes: diagnosisCodes ? parseStringArray(diagnosisCodes) : undefined,
  };

  switch (newType) {
    case 'HealthCheck':
      const newHealthCheckEntry = {
        ...newBaseEntry,
        type: newType,
        healthCheckRating: parseHealthCheckRating(healthCheckRating)
      };
      return newHealthCheckEntry;
    case 'Hospital':
      const newHospitalEntry = {
        ...newBaseEntry,
        type: newType,
        discharge: parseDischarge(discharge)
      };
      return newHospitalEntry;
    case 'OccupationalHealthcare':
      const newOccupationalHealthcareEntry = {
        ...newBaseEntry,
        type: newType,
        employerName: parseString(employerName),
        sickLeave: sickLeave ? parseSickLeave(sickLeave) : undefined
      };
      return newOccupationalHealthcareEntry;
    default:
      return assertNever(newType);
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isType = (type: any): type is "HealthCheck" | "Hospital" | "OccupationalHealthcare" => {
  return type === "HealthCheck" || type === "Hospital" || type === "OccupationalHealthcare";
};

const parseType = (param: unknown): "HealthCheck" | "Hospital" | "OccupationalHealthcare" => {
  if (!param || !isType(param)) {
    throw new Error ('Incorrect or missing type');
  }
  return param;
};

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isSickLeave = (param: any): param is SickLeave => {
  return param.startDate !== undefined && param.endDate !== undefined;
};

const parseSickLeave = (sickLeave: unknown): SickLeave => {
  if (!sickLeave || !isSickLeave(sickLeave)) {
    throw new Error('Incorrect or missing sickLeave: ' + sickLeave);
  }
  return sickLeave;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isDischarge = (param: any): param is Discharge => {
  return param.date !== undefined && param.criteria !== undefined;
};

const parseDischarge = (discharge: unknown): Discharge => {
  if (!discharge || !isDischarge(discharge)) {
    throw new Error('Incorrect or missing discharge: ' + discharge);
  }
  return discharge;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isHealthCheckRating = (param: any): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};

const parseHealthCheckRating = (healthCheckRating: unknown): HealthCheckRating => {
  if (healthCheckRating === undefined || !isHealthCheckRating(healthCheckRating)) {
    throw new Error('Incorrect or missing heatlh check rating: ' + healthCheckRating);
  }
  return healthCheckRating;
};

const parseString = (param: unknown): string => {
  if (!param || !isString(param)) {
    throw new Error ('Incorrect or missing field');
  }
  return param;
};

const parseStringArray = (param: unknown[]): string[] => {
  if (!param || !isStringArray(param)) {
    throw new Error ('Incorrect or missing field');
  }
  return param;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isStringArray = (param: any[]): param is string[] => {
  return param.every(value => typeof value === 'string') || param.every(value => value instanceof String);
};

const parseDate = (param: unknown): string => {
  if (!param || !isString(param) || !isDate(param)) {
    throw new Error('Incorrect or missing date');
  }
  return param;
};

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error ('Incorrect or missing name');
  }
  return name;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDateOfBirth = (dateOfBirth: unknown): string => {
  if (!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)) {
    throw new Error('Incorrect or missing date of birth: ' + dateOfBirth);
  }
  return dateOfBirth;
};

const parseSsn = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error ('Incorrect or missing ssn');
  }
  return ssn;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error ('Incorrect or missing occupation');
  }
  return occupation;
};
