import { Configuration, OpenAIApi } from "openai";

 // OpenAIApi required config
 const configuration = new Configuration({
    apiKey: process.env.API_KEY,
  });
  
  // OpenAIApi initialization
//   const openai = new OpenAIApi(configuration);
  
  //These arrays are to maintain the history of the conversation
  const conversationContext: any = [];
  const currentMessages: any = [];

export class ChatService {
    constructor(){

    }
  
  // Controller function to handle chat conversation
  async generateResponse (message: string) {
    try {
    //   const  prompt  = message;
    //   const modelId = "gpt-3.5-turbo";
    //   const promptText = `${prompt}\n\nResponse:`;
  
    //   // Restore the previous context
    //   for (const [inputText, responseText] of conversationContext) {
    //     currentMessages.push({ role: "user", content: inputText });
    //     currentMessages.push({ role: "assistant", content: responseText });
    //   }
  
    //   // Stores the new message
    //   currentMessages.push({ role: "user", content: promptText });
  
    //   const result = await openai.createChatCompletion({
    //     model: modelId,
    //     messages: currentMessages,
    //   });
  
    //   const responseText = result?.data?.choices?.shift()?.message?.content;
    //   conversationContext.push([promptText, responseText]);
      return 'test'
    } catch (err) {
      console.error(err);
      return err;
    }
  };
}