import React from "react";
import { Icon, Segment } from "semantic-ui-react";
import { Diagnosis, Entry, HealthCheckRating } from "../types";

const EntrySegment = ({ entry, diagnoses }: { entry : Entry, diagnoses: Diagnosis[] }) => {

    return (
        <Segment>
            <p>
                <h3>
                    {entry.date} <EntryTypeIcon entry={entry} />
                </h3>
            </p>
            <ul>
                {entry.diagnosisCodes?.map((code : string) => (
                    <li key={code}>{code} {diagnoses.find((diagnosis: Diagnosis) => (diagnosis.code === code))?.name}</li>
                ))}
            </ul>
            <p>{entry.description}</p>
            {entry.type === "HealthCheck" && <HealthCheckRatingIcon rating={entry.healthCheckRating} />}
        </Segment>
    );
};

const EntryTypeIcon = ({ entry }: { entry: Entry }) => {
    switch (entry.type) {
        case "OccupationalHealthcare":
            return <Icon name="stethoscope" size="large" />;
        case "Hospital":
            return <Icon name="hospital symbol" size="large" />;
        case "HealthCheck":
            return <Icon name="doctor" size="large" />;
        default:
            return assertNever(entry);
    }
};

const HealthCheckRatingIcon = ({ rating }: { rating: HealthCheckRating} ) => {
    switch (rating) {
        case HealthCheckRating.Healthy:
            return <Icon name="heart" color="green" />;
        case HealthCheckRating.LowRisk:
            return <Icon name="heart" color="yellow" />;
        case HealthCheckRating.HighRisk:
            return <Icon name="heart" color="red" />;
        case HealthCheckRating.CriticalRisk:
            return <Icon name="heart" color="black" />;
        default:
            return assertNever(rating);
    }
};

const assertNever = (type: never): never => {
    console.log(type);
    throw new Error("Unknown type");
};

export default EntrySegment;