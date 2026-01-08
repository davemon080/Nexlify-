
// Import required for Gemini API interactions
import { GoogleGenAI } from "@google/genai";

// Initialize the Google GenAI SDK with the API key from environment variables.
// The apiKey is provided via a named parameter as required.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Generates an intelligent response from the Gemini model based on user inquiries.
 * Uses gemini-3-flash-preview for efficient and accurate text-based Q&A.
 */
export const generateAIResponse = async (userPrompt: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userPrompt,
      config: {
        systemInstruction: "You are the Nexlify AI Consultant. You are professional, creative, and highly knowledgeable about Nexlify's digital services: Web Development, Graphic Design, and Content Writing. Your goal is to help users understand how Nexlify can elevate their brand and encourage them to reach out via the inquiry page. Keep responses concise, sophisticated, and helpful.",
      },
    });

    // Directly access the .text property from the GenerateContentResponse object.
    return response.text || "I'm sorry, I'm having trouble processing that right now.";
  } catch (error) {
    console.error("AI Generation Error:", error);
    return "I'm sorry, I encountered an error. Please contact our team directly!";
  }
};
