import { APIGatewayProxyHandler, APIGatewayProxyEvent } from 'aws-lambda';
import { DbUtils } from '../shared/db/db';
import { createResponse } from '../shared/utils/genericUtils';
export const handler = async (event: APIGatewayProxyEvent, context, callback) => {
    try{
        const id = event.queryStringParameters?.id;
        const dbUtils = new DbUtils();
        await dbUtils.createConnection();
        if(!id){
            const candidates = await dbUtils.getAllCandidates();
            return createResponse(200, JSON.stringify(candidates))
        }
        const candidate = await dbUtils.getCandidate(id);
        return createResponse(200,JSON.stringify(candidate))
    } catch(e){
        console.log(e)
        return e;
    }
}