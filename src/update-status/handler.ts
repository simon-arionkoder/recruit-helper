import { APIGatewayProxyHandler, APIGatewayProxyEvent } from 'aws-lambda';
import { DbUtils } from '../shared/db/db';
import { createResponse } from '../shared/utils/genericUtils';
import { parsingUtils } from '../shared/utils/parsingUtils';
export const handler = async (event: APIGatewayProxyEvent, context, callback) => {
    try{
        const body = JSON.parse(event.body ?? '');
        const candidate = parsingUtils.parseUpdateCandidateBody(body);
        const dbUtils = new DbUtils();
        await dbUtils.createConnection();
        const savedCandidate = await dbUtils.updateCandidateStatus(candidate);
        console.log(savedCandidate)
        return createResponse(200,JSON.stringify(candidate))
    } catch(e){
        console.log(e)
        return e;
    }
}