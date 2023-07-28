import { APIGatewayProxyHandler, APIGatewayProxyEvent } from 'aws-lambda';
export const handler = async (event: APIGatewayProxyEvent, context, callback) => {
    return 'hello world';
}