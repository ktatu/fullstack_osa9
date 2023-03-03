import { NewPatient, Gender, PatientFields } from "./types";

const toNewPatient = ({ name, dateOfBirth, ssn, gender, occupation } : PatientFields): NewPatient => {
    const newPatient: NewPatient = {
        name: parseName(name),
        dateOfBirth: parseDateOfBirth(dateOfBirth),
        ssn: parseSsn(ssn),
        occupation: parseOccupation(occupation),
        gender: parseGender(gender),
        entries: []
    };

    return newPatient;
};

const parseName = (name: unknown): string => {
    if (!name || !isString(name)) {
        throw new Error('Invalid name');
    }

    return name;
};

const parseDateOfBirth = (date: unknown): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Invalid date');
    }

    return date;
};

const parseSsn = (ssn: unknown): string => {
    if (!ssn || !isString(ssn)) {
        throw new Error('Invalid ssn');
    }

    return ssn;
};

const parseOccupation = (occupation: unknown): string => {
    if (!occupation || !isString(occupation)) {
        throw new Error('Invalid occupation');
    }

    return occupation;
};

const parseGender = (gender: unknown): Gender => {
    if (!gender || !isGender(gender)) {
        throw new Error('Invalid gender. Options are \'male\', \'female\' and \'other\'');
    }

    return gender;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(Gender).includes(param);
};

const isString = (text: unknown): text is string => {
    return typeof(text) === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

export default toNewPatient;