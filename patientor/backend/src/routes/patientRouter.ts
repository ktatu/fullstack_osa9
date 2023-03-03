import express from 'express';
import patientService from '../services/patientService';
import toNewPatient from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
    res.status(200).json(patientService.getPublicPatient());
});

router.get('/:id', (req, res) => {
    const patientId = String(req.params.id);
    const patient = patientService.getPatient(patientId);

    console.log("patient id ", patientId)
    if (patient) {
        console.log("patient ", patient)
        res.json(patient);
    } else {
        res.sendStatus(404);
    }

});

router.post('/', (req, res) => {
    try {
        // I think this lint error is happening because my package versions are newer than what the material was made on
        // so I'll just disable these, they aren't mentioned in the material
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        const newPatient = toNewPatient(req.body);
        const addedPatient = patientService.addPatient(newPatient);

        res.json(addedPatient);
    } catch (error: unknown) {
        let errorMsg = 'Error: ';
        if (error instanceof Error) {
            errorMsg += error.message;
        }

        res.status(400).send(errorMsg);
    }
});

export default router;

