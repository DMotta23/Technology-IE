
import { GoogleGenAI, Type } from "@google/genai";
import type { Recipe, Product, AssistantRecipe } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("API_KEY environment variable not set. Gemini API calls will fail.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

export const getRecipeIdeas = async (productName: string): Promise<Recipe[]> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
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

export const generateRecipesFromInventory = async (userRequest: string, products: Product[]): Promise<AssistantRecipe[]> => {
    try {
        const inventory = products.map(p => ({
            id: p.id,
            name: p.name,
            price: p.price,
            unit: p.unit
        }));

        const response = await ai.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: `
                You are a culinary assistant for a farm-to-table store. 
                
                Available Inventory: ${JSON.stringify(inventory)}
                
                User Request: "${userRequest}"
                
                Task: Suggest 1-3 recipes based on the request. 
                Try to prioritize using ingredients from the Available Inventory.
                For each ingredient in the recipe:
                1. Specify the name and the amount needed (e.g. "2 cups").
                2. If the ingredient matches an item in the Available Inventory, provide the 'matchedProductId' and calculate the 'quantityToBuy' (integer) needed to fulfill the amount.
            `,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        recipes: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    name: { type: Type.STRING },
                                    description: { type: Type.STRING },
                                    instructions: { 
                                        type: Type.ARRAY,
                                        items: { type: Type.STRING }
                                    },
                                    ingredients: {
                                        type: Type.ARRAY,
                                        items: {
                                            type: Type.OBJECT,
                                            properties: {
                                                name: { type: Type.STRING },
                                                amount: { type: Type.STRING },
                                                matchedProductId: { type: Type.INTEGER, description: "ID of the product if found in inventory, else null/undefined" },
                                                quantityToBuy: { type: Type.INTEGER, description: "Number of units to buy from store" }
                                            },
                                            required: ["name", "amount"]
                                        }
                                    }
                                },
                                required: ["name", "description", "instructions", "ingredients"]
                            }
                        }
                    },
                    required: ["recipes"]
                }
            }
        });

        const jsonString = response.text.trim();
        const parsedJson = JSON.parse(jsonString);
        
        if (parsedJson && parsedJson.recipes) {
            return parsedJson.recipes as AssistantRecipe[];
        } else {
            return [];
        }

    } catch (error) {
        console.error("Error generating assistant recipes:", error);
        throw new Error("Failed to generate recipes.");
    }
}
