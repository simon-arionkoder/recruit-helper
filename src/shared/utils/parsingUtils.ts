import { Candidate } from "../db/models/candidate";

export namespace parsingUtils {
    export function parseCandidateBody(body): Candidate {
        const newCandidate = new Candidate();
        newCandidate.about = body.about;
        newCandidate.name = body.name;
        newCandidate.status = 'EXISTS';
        return newCandidate;
    }
}