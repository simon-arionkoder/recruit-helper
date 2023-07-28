import { APIGatewayProxyHandler, APIGatewayProxyEvent } from 'aws-lambda';
import { DbUtils } from '../shared/db/db';
export const handler = async (event: APIGatewayProxyEvent, context, callback) => {
    try{
        const id = parseInt(event.queryStringParameters?.id as any);
        const dbUtils = new DbUtils();
        await dbUtils.createConnection();
        const candidate = await dbUtils.getCandidate(id);
        return JSON.stringify(candidate);
    } catch(e){
        console.log(e)
        return e;
    }
}