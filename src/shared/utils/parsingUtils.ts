import { Candidate } from "../db/models/candidate";
import { Positions } from "../db/models/positions";
import { createUniqueId } from "./genericUtils";
var moment = require('moment');

export namespace parsingUtils {
    export function parseCandidateBody(body, requestBody): Candidate {
        const newCandidate = new Candidate();
        const parsedBody = JSON.parse(body.content);
        newCandidate.company = parsedBody.company;
        newCandidate.name = parsedBody.name;
        newCandidate.country = parsedBody.country;
        newCandidate.company = parsedBody.current_company;
        newCandidate.position = parsedBody.position;
        newCandidate.years_experience = parsedBody.years_of_experience;
        newCandidate.message = requestBody.message;
        newCandidate.url = requestBody.url;
        newCandidate.last_update = moment().format("YYYY-MM-DD hh:mm:ss");
        newCandidate.status = 'pending';
        newCandidate.unique_id = createUniqueId(parsedBody.name);
        return newCandidate;
    }

    export function parseUpdateCandidateBody(body): Candidate {
        const updateCandidate = new Candidate();
        updateCandidate.name = body.name;
        updateCandidate.status = body.status;
        updateCandidate.unique_id = createUniqueId(body.name);
        return updateCandidate;
    }

    export function parsePositionBody(body): Positions {
        const newPosition = new Positions();
        newPosition.name = body.name;
        return newPosition;
    }
}