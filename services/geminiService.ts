
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { Message } from "../types";

// Helper to get client (assumes key is in env or user context, but following instructions to use env)
const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key not found in environment.");
  }
  // Initialize with named parameter as required by the library
  return new GoogleGenAI({ apiKey });
};

export const generateText = async (
  modelId: string, 
  prompt: string, 
  history: Message[],
  systemInstruction?: string
): Promise<string> => {
  try {
    const ai = getClient();
    
    // Construct contents from history + current prompt for conversational context
    const contents = [
      ...history.map(m => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.content }]
      })),
      { role: 'user', parts: [{ text: prompt }] }
    ];
    
    // Call generateContent with model name and contents
    const response = await ai.models.generateContent({
      model: modelId,
      contents,
      config: {
        systemInstruction: systemInstruction,
      }
    });

    // Directly access the .text property (not a method call)
    return response.text || "No response text generated.";
  } catch (error) {
    console.error("Gemini Text Generation Error:", error);
    return `Error: ${(error as Error).message}`;
  }
};

export const generateImage = async (
  modelId: string,
  prompt: string
): Promise<string> => {
  try {
    const ai = getClient();
    
    // Using generateContent for image generation as per SDK guidelines for nano banana models
    const response = await ai.models.generateContent({
      model: modelId,
      contents: {
        parts: [{ text: prompt }]
      },
      config: {
        imageConfig: {
          aspectRatio: "1:1"
        }
      }
    });

    // Iterate through response parts to find the generated image
    const candidates = response.candidates;
    if (candidates && candidates.length > 0) {
      for (const part of candidates[0].content.parts) {
        if (part.inlineData) {
          const base64EncodeString: string = part.inlineData.data;
          return `data:image/png;base64,${base64EncodeString}`;
        } else if (part.text) {
          console.debug("Model returned text instead of image:", part.text);
        }
      }
    }
    
    return ""; // No image found
  } catch (error) {
    console.error("Gemini Image Generation Error:", error);
    throw error;
  }
};

// Simulation for Video/Music since direct API might need specific paid permissions or are external
export const simulateGeneration = async (
  type: 'video' | 'music',
  prompt: string
): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`[模拟结果] ${type === 'video' ? '视频' : '音乐'}生成任务已提交。\n\n提示词: "${prompt}"\n\n(注意：这是聚合平台的演示接口，真实生成需要接入对应厂商的SDK)`);
    }, 2000);
  });
};
