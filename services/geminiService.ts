import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { Message } from "../types";

// Helper to get client (assumes key is in env or user context, but following instructions to use env)
const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key not found in environment.");
  }
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
    
    // Construct contents from history + current prompt
    // Ideally we would pass full history, but for this demo we focus on the last prompt 
    // or simple concatenation to keep state management simple in the UI.
    // In a production app, map Message[] to the Content format expected by SDK.
    
    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt, // Simplified for this demo
      config: {
        systemInstruction: systemInstruction,
      }
    });

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
    
    // Using generateContent for nano banana series (standard flash image)
    const response = await ai.models.generateContent({
      model: modelId,
      contents: {
        parts: [{ text: prompt }]
      }
    });

    // Extract image
    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
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