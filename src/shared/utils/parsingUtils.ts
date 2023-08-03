import { Candidate } from "../db/models/candidate";
import { Positions } from "../db/models/positions";
import { createUniqueId } from "./genericUtils";
export namespace parsingUtils {
    export function parseCandidateBody(body): Candidate {
        const newCandidate = new Candidate();
        newCandidate.about = body.json.about;
        newCandidate.name = body.json.name;
        newCandidate.status = 'pending';
        newCandidate.unique_id = createUniqueId(body.json.name);
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