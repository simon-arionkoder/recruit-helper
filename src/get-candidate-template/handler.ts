import { APIGatewayProxyHandler, APIGatewayProxyEvent } from 'aws-lambda';
import { ChatService } from '../shared/services/chatGpt';


export const handler = async (event: APIGatewayProxyEvent, context, callback) => {
    try{
        const body = JSON.parse(event.body as any);
        const chatService = new ChatService();
        const messages = [
            { role: "user", content: "Whats the capital of Brazil?" },
          ];
        
          const options = {
            temperature: 0.8,
            max_tokens: 100,
          };
        const result = await chatService.createChatCompletion(messages,options);
        console.log(result[0].message)
        return JSON.stringify(result[0].message);
    } catch(e){
        console.log(e)
        throw e;
    }
}