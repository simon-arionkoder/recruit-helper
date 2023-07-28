import { APIGatewayProxyHandler, APIGatewayProxyEvent } from 'aws-lambda';
import {ChatService} from '../shared/services/chatGpt';


export const handler = async (event: APIGatewayProxyEvent, context, callback) => {
    try{
        const body = JSON.parse(event.body as any);
        const chatService = new ChatService();
        const result = await chatService.generateResponse('Whats the capital of Colombia?');
        console.log(result)
        return JSON.stringify(result);
    } catch(e){
        console.log(e)
        throw e;
    }
}