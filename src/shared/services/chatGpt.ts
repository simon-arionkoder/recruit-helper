import { Configuration, OpenAIApi } from 'openai';
import { endQuery, startQuery, StartPrompt } from './templateConstants';

const configuration = new Configuration({
  apiKey: process.env.GPT_KEY,
});
const openai = new OpenAIApi(configuration);

export class ChatService{
    public async createChatCompletion(candidate, skills: string[]){
      try{
        const recruiterName = candidate.recruiterName;
        const recruiterEmail = candidate.recruiterEmail;
        const position = candidate.position;
        let message = StartPrompt.replace('__recruiterName__',recruiterName).replace('__recruiterEmail__',recruiterEmail).replace('__position__',position);
        message += JSON.stringify(candidate.json);
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
