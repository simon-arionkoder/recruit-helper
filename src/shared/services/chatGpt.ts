import { Configuration, OpenAIApi } from 'openai';
import { endQuery, startQuery } from './templateConstants';

const configuration = new Configuration({
  apiKey: process.env.GPT_KEY,
});
const openai = new OpenAIApi(configuration);

export class ChatService{
    public async createChatCompletion(candidate, skills: string[]){
      try{
        let message = startQuery;
        message += skills;
        message += endQuery;
        message += JSON.stringify(candidate);
        const completion = await openai.createChatCompletion({
          model: "gpt-3.5-turbo",
          messages: [{role: "user", content: message}],
        });
        return completion.data.choices[0].message;
      } catch(e){
        console.log('Error sending request to chatGPT - ', e.response)
        throw e.response;
      }
    } 
}
