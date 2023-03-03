import React, { useState } from "react";
import axios from "axios";
import { Diagnosis, Entry, Patient } from "../types";
import { useParams } from "react-router-dom";

import { addPatient, useStateValue } from "../state";

import { apiBaseUrl } from "../constants";

import EntrySegment from "./EntrySegment";

const PatientInfoPage = () => {
    const [{ patients }, dispatch] = useStateValue();
    const [patient, setPatient] = useState<Patient | undefined>();
    const { id } = useParams<{ id: string }>();
    const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

    React.useEffect(() => {
        const patientFromState = Object.values(patients).find((patient: Patient) => patient.id === id);

        if (patientFromState?.entries) {
            setPatient(patientFromState);
            return;
        }
        console.log(diagnoses);

        const fetchPatient = async (patientId: string) => {
            try {
                const { data: patientFromApi } = await axios.get<Patient>(
                `${apiBaseUrl}/patients/${patientId}`
                );
                setPatient(patientFromApi);
                dispatch(addPatient(patientFromApi));
            } catch (e) {
                console.error(e);
            }
        };
        void fetchPatient(id);
    }, [id]);

    React.useEffect(() => {
        const fetchDiagnoses = async () => {
            try {
                const { data: diagnosesFromApi } = await axios.get<Diagnosis[]>(`${apiBaseUrl}/diagnoses`);
                setDiagnoses(diagnosesFromApi);
            } catch (e) {
                console.error(e);
            } 
        };
        void fetchDiagnoses();
    }, [patient]);

    return (
        <div>
            <h3>{patient?.name} ({patient?.gender})</h3>
            <p>
                ssn: {patient?.ssn}
                <br />
                occupation: {patient?.occupation}
            </p>
            <h4>Entries</h4>
            {patient?.entries?.map((entry: Entry) => (
                <EntrySegment key={entry.id} entry={entry} diagnoses={diagnoses} />
            ))}
        </div>
    );
};

export default PatientInfoPage;

/*
            {patient?.entries?.map((entry: Entry) => (
                <div key={entry.id}>
                    <p>{entry.date} {entry.description}</p>
                    <ul>
                        {entry.diagnosisCodes?.map((code : string) => (
                            <li key={code}>{code} {diagnoses.find((diagnosis: Diagnosis) => (diagnosis.code === code))?.name}</li>
                        ))}
                    </ul>
                </div>
            ))}
*/