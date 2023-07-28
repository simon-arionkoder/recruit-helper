import axios from 'axios';

const openai = axios.create({
  baseURL: "https://api.openai.com/v1",
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${process.env.GPT_KEY}`,
  },
});
export class ChatService{
    public async createChatCompletion(messages, options) {
        try {
          const response = await openai.post("/chat/completions", {
            model: "gpt-3.5-turbo",
            messages,
            ...options,
          });
      
          return response.data.choices;
        } catch (error) {
          console.error("Error creating chat completion:", error);
        }
      }
}
