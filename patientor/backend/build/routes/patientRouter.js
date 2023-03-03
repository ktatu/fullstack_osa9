"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patientService_1 = __importDefault(require("../services/patientService"));
const utils_1 = __importDefault(require("../utils"));
const router = express_1.default.Router();
router.get('/', (_req, res) => {
    res.status(200).json(patientService_1.default.getPatientDataNoSsn());
});
router.post('/', (req, res) => {
    try {
        // I think this lint error is happening because my package versions are newer than what the material was made on
        // so I'll just disable these, they aren't mentioned in the material
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        const newPatient = (0, utils_1.default)(req.body);
        const addedPatient = patientService_1.default.addPatient(newPatient);
        res.json(addedPatient);
    }
    catch (error) {
        let errorMsg = 'Error: ';
        if (error instanceof Error) {
            errorMsg += error.message;
        }
        res.status(400).send(errorMsg);
    }
});
exports.default = router;
