import { APIGatewayProxyHandler, APIGatewayProxyEvent } from 'aws-lambda';
import { DbUtils } from '../shared/db/db';
import { createResponse } from '../shared/utils/genericUtils';
export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent, context, callback) => {
    try{
        const id = parseInt(event.queryStringParameters?.id as any);
        const dbUtils = new DbUtils();
        await dbUtils.createConnection();
        const candidate = await dbUtils.getPositions();
        return createResponse(200,JSON.stringify(candidate))
    } catch(e){
        console.log(e)
        return e;
    }
}