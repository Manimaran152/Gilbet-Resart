import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { AnalysisResult } from '../types';

// Initialize Gemini Client
// IMPORTANT: API Key is injected via process.env.API_KEY
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const MODEL_NAME = 'gemini-2.5-flash';

/**
 * Analyzes an image to identify ingredients or dishes and provides Tamil cultural context.
 */
export const analyzeImageForChef = async (base64Image: string, mimeType: string): Promise<AnalysisResult> => {
  try {
    const prompt = `
      You are the Head Chef at "Gillbet Resart", a prestigious restaurant specializing in authentic Tamil cuisine.
      
      Look at the provided image. 
      1. If it contains raw ingredients, suggest a traditional Tamil dish that can be made with them.
      2. If it is a prepared dish, identify it (or the closest Tamil equivalent) and explain its cultural significance in Tamil Nadu.
      3. If it is not food related, politely explain you only analyze food.

      Format the response as a JSON object with the following keys:
      - title: The name of the dish or ingredients identified.
      - culturalContext: A poetic and cultural description (approx 50 words) linking it to Tamil traditions, festivals, or history.
      - recipeSuggestion: A brief description of the flavor profile and key cooking method.

      Do not use Markdown formatting in the JSON. Return raw JSON.
    `;

    const response: GenerateContentResponse = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: {
        parts: [
          {
            inlineData: {
              data: base64Image,
              mimeType: mimeType,
            },
          },
          {
            text: prompt,
          },
        ],
      },
      config: {
        responseMimeType: 'application/json',
      }
    });

    const text = response.text;
    if (!text) {
      throw new Error("No response from AI");
    }

    return JSON.parse(text) as AnalysisResult;

  } catch (error) {
    console.error("Error analyzing image:", error);
    throw error;
  }
};

/**
 * Generates a creative welcome message or daily special description.
 */
export const generateDailySpecial = async (): Promise<string> => {
  try {
    const prompt = "Generate a very short, poetic, 8-word slogan inviting people to taste authentic Madurai cuisine at a restaurant.";
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
    });
    return response.text || "Authentic Madurai flavors served with love.";
  } catch (error) {
    return "Authentic Madurai flavors served with love.";
  }
}