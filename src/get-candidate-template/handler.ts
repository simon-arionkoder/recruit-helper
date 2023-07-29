import { APIGatewayProxyHandler, APIGatewayProxyEvent } from 'aws-lambda';
import { ChatService } from '../shared/services/chatGpt';
import { DbUtils } from '../shared/db/db';
import { parsingUtils } from '../shared/utils/parsingUtils';

// const body = JSON.parse(event.body as any);
// const chatService = new ChatService();
// const messages = [
//     { role: "user", content: "Whats the capital of Brazil?" },
//     ];

//     const options = {
//     temperature: 0.8,
//     max_tokens: 100,
//     };
// const result = await chatService.createChatCompletion(messages,options);
// console.log(result[0].message)


export const handler = async (event: APIGatewayProxyEvent, context, callback) => {
    try{
        const body = JSON.parse(event.body ?? '');
        // Use the body to query GPT
        // Save the candidate
        const candidate = parsingUtils.parseCandidateBody(body);
        const dbUtils = new DbUtils();
        await dbUtils.createConnection();
        const savedCandidate = await dbUtils.saveCandidate(candidate)
        return JSON.stringify(savedCandidate);
    } catch(e){
        console.log(e)
        throw e;
    }
}