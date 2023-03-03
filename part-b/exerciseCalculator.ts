interface Result {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number
    average: number
}

interface TrainingLog {
    target: number,
    trainingHours: Array<number>
}

type RatingDesc = 'Excellent' | 'Good' | 'Poor';

const getResult = (log: TrainingLog): Result => {
    const resObj = {} as Result;

    resObj.target = log.target;
    resObj.trainingDays = numOfTrainingDays(log.trainingHours);
    resObj.periodLength = log.trainingHours.length;
    resObj.average = avgHours(log.trainingHours);
    resObj.rating = evalRating(resObj.average, resObj.target);
    resObj.ratingDescription = setRatingDesc(resObj.rating);
    resObj.success = resObj.average >= resObj.target ? true : false;

    return resObj;
};

const numOfTrainingDays = (days: Array<number>): number => days.filter(day => day !== 0).length;

const avgHours = (days: Array<number>): number => days.reduce((prevValue, currValue) => (prevValue + currValue), 0) / days.length;

const evalRating = (avg: number, target: number): number => {
    const evalMetric = avg / target;

    if (evalMetric < 0.5) {
        return 1;
    } else if (evalMetric < 0.8) {
        return 2;
    }
    return 3;
};

const setRatingDesc = (rating: number): RatingDesc => {
    if (rating == 1) {
        return 'Poor';
    } else if (rating == 2) {
        return 'Good';
    }
    return 'Excellent';
};

const createTrainingLog = (args: Array<string>): TrainingLog => {
    const log = {} as TrainingLog;
    log.target = parseInt(args[2]);

    const array: Array<number> = [];
    for (let i = 3; i < args.length; i++) {
        array.push(parseFloat(args[i]));
    }
    log.trainingHours = array;

    return log;
}; 

const validateArgs = (args: Array<string>) => {
    console.log('args ', args);
    if (args.length < 2) {
        throw new Error('Minimum length of 2 arguments');
    }

    for (let i = 2; i < args.length; i++) {
        const val = parseFloat(args[i]);
        if (isNaN(val)) {
            throw new Error('One of arguments was not a number.');
        }
        if (val > 24) {
            throw new Error('Training hours for any day cannot exceed 24 hours');
        }
    }
};

// for some reason negative values dont show up in process.argv so i wont validate those

try {
    validateArgs(process.argv);
    const log = createTrainingLog(process.argv);
    console.log(getResult(log));
} catch (error: unknown) {
    let errorMsg = 'Error. ';
    if (error instanceof Error) {
        errorMsg += error.message;
    }
    console.log(errorMsg);
}