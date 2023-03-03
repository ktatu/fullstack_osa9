interface Measurements {
    weight: number,
    height: number
}

interface BmiRes {
    weight: number,
    height: number,
    bmi: string
}

const evalBmi = (measr: Measurements): string => {
    const heightInMtr = measr.height / 100;
    const bmiValue = (measr.weight / (heightInMtr * heightInMtr));
    console.log('bmi ', bmiValue);

    if (bmiValue < 16) {
        return 'Underweight';
    } else if (bmiValue < 16.9) {
        return 'Underweight (Moderate thinness)';
    } else if (bmiValue < 18.4) {
        return 'Underweight (Mild thinness)';
    } else if (bmiValue < 24.9) {
        return 'Normal range';
    } else if (bmiValue < 29.9) {
        return 'Overweight (Pre-obese)';
    } else if (bmiValue < 34.9) {
        return 'Obese (Class I)';
    } else if (bmiValue < 39.9) {
        return 'Obese (Class II)';
    } else {
        return 'Obese (Class III)';
    }
};

const parseArguments = (heightStr: string, weightStr: string): Measurements => {
    const height = parseInt(heightStr);
    const weight = parseInt(weightStr);

    if (isNaN(height) || isNaN(weight)) {
        throw new Error ('Given height or weight was not a number');
    }
    if (!height || !weight) {
        throw new Error ('Parameter missing');
    }

    return { weight: weight, height: height } as Measurements;
};

const calculateBmi = (heightStr: string, weightStr: string): BmiRes => {
    const msr = parseArguments(heightStr, weightStr); 

    return { ...msr, bmi: evalBmi(msr) } as BmiRes;
};
/* code for exercises prior to 9.5
try {
    const measr = parseArguments(process.argv)
    console.log(evalBmi(measr))
} catch (error: unknown) {
    let errorMsg = 'Error. '
    if (error instanceof Error) {
        errorMsg += error.message
    }
    console.log(errorMsg)
}
*/
export { calculateBmi };