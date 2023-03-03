import express from 'express';
import { calculateBmi } from './bmiCalculator';

const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    const height = req.query.height?.toString();
    const weight = req.query.weight?.toString();

    if (!height || !weight) {
        return res.status(400).json({ error: 'malformatted parameters' });
    }

    try {
        const resObj = calculateBmi(height, weight);
        return res.status(200).json(resObj);
    } catch (err: unknown) {
        console.log(err);
        if (err instanceof Error) {
            return res.status(400).json({ error: err.message });
        }
        return res.sendStatus(500);
    }
});

app.listen(3001, () => {
    console.log('app started on port 3001');
});