import { APIGatewayProxyHandler, APIGatewayProxyEvent } from 'aws-lambda';
import { ChatService } from '../shared/services/chatGpt';
import { createResponse } from '../shared/utils/genericUtils';

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent, context, callback) => {
    try{
        const body = JSON.parse(event.body ?? '');
        // Use the body to query GPT
        const chatService = new ChatService();
        const chatResp = await chatService.createChatCompletion(body)
        return createResponse(200, JSON.stringify(chatResp));
    } catch(e){
        console.log(e)
        return e;
    }
}