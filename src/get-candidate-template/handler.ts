import { APIGatewayProxyHandler, APIGatewayProxyEvent } from 'aws-lambda';
import { ChatService } from '../shared/services/chatGpt';
import { DbUtils } from '../shared/db/db';
import { parsingUtils } from '../shared/utils/parsingUtils';
import { createResponse } from '../shared/utils/genericUtils';

export const handler = async (event: APIGatewayProxyEvent, context, callback) => {
    try{
        const body = JSON.parse(event.body ?? '');
        // Use the body to query GPT
        const chatService = new ChatService();
        const chatResp = await chatService.createChatCompletion(body, ['React', 'Javascript', 'NodeJS'])
        // Save the candidate
        const candidate = parsingUtils.parseCandidateBody(body);
        const dbUtils = new DbUtils();
        await dbUtils.createConnection();
        const savedCandidate = await dbUtils.saveCandidate(candidate);
        console.log(savedCandidate)
        return createResponse(200, JSON.stringify(chatResp));
    } catch(e){
        console.log(e)
        return e;
    }
}