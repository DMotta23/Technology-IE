
import { GoogleGenAI, Type } from "@google/genai";
import type { Recipe } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("API_KEY environment variable not set. Gemini API calls will fail.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

export const getRecipeIdeas = async (productName: string): Promise<Recipe[]> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Provide three simple and creative recipe ideas for ${productName}.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            recipes: {
              type: Type.ARRAY,
              description: "A list of three recipe ideas.",
              items: {
                type: Type.OBJECT,
                properties: {
                  recipeName: {
                    type: Type.STRING,
                    description: "The name of the recipe.",
                  },
                  description: {
                    type: Type.STRING,
                    description: "A short, enticing description of the dish."
                  },
                  ingredients: {
                    type: Type.ARRAY,
                    description: "A list of key ingredients.",
                    items: {
                      type: Type.STRING,
                    },
                  },
                  instructions: {
                    type: Type.ARRAY,
                    description: "Step-by-step instructions.",
                    items: {
                      type: Type.STRING,
                    },
                  },
                },
                required: ["recipeName", "description", "ingredients", "instructions"],
              },
            },
          },
          required: ["recipes"],
        },
      },
    });

    const jsonString = response.text.trim();
    const parsedJson = JSON.parse(jsonString);
    
    if (parsedJson && parsedJson.recipes) {
        return parsedJson.recipes as Recipe[];
    } else {
        throw new Error("Invalid response format from Gemini API");
    }

  } catch (error) {
    console.error("Error generating recipe ideas:", error);
    throw new Error("Failed to get recipe ideas. Please check your API key and try again.");
  }
};
