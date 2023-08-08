import { APIGatewayProxyHandler, APIGatewayProxyEvent } from 'aws-lambda';
import { DbUtils } from '../shared/db/db';
import { createResponse } from '../shared/utils/genericUtils';
export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent, context, callback) => {
    try{
        const id = event.queryStringParameters?.id;
        const position = event.queryStringParameters?.position;
        const dbUtils = new DbUtils();
        await dbUtils.createConnection();
        if (id){
            const candidate = await dbUtils.getCandidate(id);
            return createResponse(200,JSON.stringify(candidate))
        } else if (position){
            const candidates = await dbUtils.getCandidatePosition(position);
            return createResponse(200, JSON.stringify(candidates))
        }
        else {
            const candidates = await dbUtils.getAllCandidates();
            return createResponse(200, JSON.stringify(candidates))
        }
    } catch(e){
        console.log(e)
        return e;
    }
}