
import { GoogleGenAI, Chat, GenerateContentResponse, Modality } from "@google/genai";
import { Message } from '../types';

let ai: GoogleGenAI | null = null;
let chat: Chat | null = null;

const getAI = () => {
  if (!ai) {
    if (!process.env.API_KEY) {
      throw new Error("API_KEY environment variable not set");
    }
    ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }
  return ai;
};

export const startChat = () => {
    const aiInstance = getAI();
    chat = aiInstance.chats.create({
        model: 'gemini-2.5-flash',
        config: {
            systemInstruction: 'شما یک دستیار هوش مصنوعی به نام اسمارت هستید. دوستانه، مفید و مختصر صحبت کنید.',
        }
    });
};

export const getChatResponse = async (history: Message[], newMessage: string): Promise<string> => {
    if (!chat) {
        startChat();
    }
    try {
        const result: GenerateContentResponse = await chat!.sendMessage({ message: newMessage });
        return result.text;
    } catch (error) {
        console.error("Error getting chat response:", error);
        return "متاسفانه مشکلی در ارتباط با هوش مصنوعی پیش آمد. لطفا دوباره تلاش کنید.";
    }
};

export const generateImage = async (prompt: string): Promise<string | null> => {
    const aiInstance = getAI();
    try {
        const response: GenerateContentResponse = await aiInstance.models.generateContent({
            model: 'gemini-2.5-flash-image',
            contents: { parts: [{ text: prompt }] },
            config: {
                responseModalities: [Modality.IMAGE],
            },
        });

        for (const part of response.candidates[0].content.parts) {
            if (part.inlineData) {
                const base64ImageBytes: string = part.inlineData.data;
                return `data:image/png;base64,${base64ImageBytes}`;
            }
        }
        return null;
    } catch (error) {
        console.error("Error generating image:", error);
        return null;
    }
};
