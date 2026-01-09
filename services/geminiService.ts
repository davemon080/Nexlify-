
import { GoogleGenAI } from "@google/genai";

// Safe check for process.env to prevent blank page crashes in browser-only environments
const getApiKey = () => {
  try {
    return (typeof process !== 'undefined' && process.env) ? process.env.API_KEY : null;
  } catch {
    return null;
  }
};

const API_KEY = getApiKey();
const ai = API_KEY ? new GoogleGenAI({ apiKey: API_KEY }) : null;

/**
 * Generates an intelligent response from the Gemini model based on user inquiries.
 * Uses gemini-3-flash-preview for efficient and accurate text-based Q&A.
 */
export const generateAIResponse = async (userPrompt: string): Promise<string> => {
  if (!ai) {
    return "The AI Consultant is currently offline (Missing API Key). Please use our contact form or check your environment variables.";
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userPrompt,
      config: {
        systemInstruction: "You are the Nexlify AI Consultant. You are professional, creative, and highly knowledgeable about Nexlify's digital services: Web Development, Graphic Design, and Content Writing. Your goal is to help users understand how Nexlify can elevate their brand and encourage them to reach out via the inquiry page. Keep responses concise, sophisticated, and helpful.",
      },
    });

    return response.text || "I'm sorry, I'm having trouble processing that right now.";
  } catch (error) {
    console.error("AI Generation Error:", error);
    return "I'm sorry, I encountered an error. Please contact our team directly!";
  }
};
