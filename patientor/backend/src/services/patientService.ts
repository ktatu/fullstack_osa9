import patientData from '../data/patients';
import { v1 as uuid } from 'uuid';

import { Patient, NewPatient, PublicPatient } from '../types';

const patients: Array<Patient> = patientData;

const getPublicPatient = (): PublicPatient[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

const getPatient = (id: string | undefined): Patient | undefined => {
    const patient = patients.find(patient => patient.id === id);

    console.log("patients ", patients)

    return patient;
}

const addPatient = (newPatient: NewPatient): Patient => {
    const patient = { id: uuid(), ...newPatient, entries: [] };
    patientData.push(patient);

    return patient;
};

export default {
    getPublicPatient,
    getPatient,
    addPatient
};