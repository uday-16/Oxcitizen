
import { GoogleGenAI, Modality } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY;

export const chatWithCitizenAI = async (message: string, history: any[] = []) => {
  if (!apiKey) throw new Error("GEMINI_API_KEY is not set");
  
  const ai = new GoogleGenAI({ apiKey });
  
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: [
      ...history,
      { role: "user", parts: [{ text: message }] }
    ],
    config: {
      systemInstruction: "You are CitizenAI, a helpful companion for citizens. You specialize in government schemes, jobs, and citizen services. Provide accurate, empathetic, and concise information in the user's preferred language (English, Hindi, or Telugu). Detect the language automatically and respond accordingly. Use Google Search to provide the most up-to-date information.",
      tools: [{ googleSearch: {} }],
    }
  });

  return {
    text: response.text,
    grounding: response.candidates?.[0]?.groundingMetadata?.groundingChunks || []
  };
};

export const getNearbyServices = async (query: string, location?: { latitude: number, longitude: number }) => {
  if (!apiKey) throw new Error("GEMINI_API_KEY is not set");

  const ai = new GoogleGenAI({ apiKey });
  
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `Find ${query} nearby.`,
    config: {
      tools: [{ googleMaps: {} }],
      toolConfig: {
        retrievalConfig: {
          latLng: location ? {
            latitude: location.latitude,
            longitude: location.longitude
          } : undefined
        }
      }
    },
  });

  return {
    text: response.text,
    places: response.candidates?.[0]?.groundingMetadata?.groundingChunks
      ?.filter((chunk: any) => chunk.maps)
      ?.map((chunk: any) => chunk.maps) || []
  };
};

export const startLiveVoiceSession = async (callbacks: any, lang: string = 'en-IN') => {
  if (!apiKey) throw new Error("GEMINI_API_KEY is not set");

  const ai = new GoogleGenAI({ apiKey });
  
  // Select voice based on language
  let voiceName = "Zephyr";
  if (lang.startsWith('hi')) voiceName = "Puck";
  if (lang.startsWith('te')) voiceName = "Kore";

  return ai.live.connect({
    model: "gemini-2.5-flash-native-audio-preview-12-2025",
    config: {
      responseModalities: [Modality.AUDIO],
      systemInstruction: `You are CitizenAI. You are a voice-first assistant for citizens. 
      Primary language: ${lang}. 
      Focus: Government schemes, jobs, and citizen services. 
      Behavior: Speak naturally and helpfully. If the user speaks a different language (English, Hindi, or Telugu), switch to that language immediately and continue the conversation in that language. Use the appropriate tone for a helpful digital companion.`,
      speechConfig: {
        voiceConfig: { prebuiltVoiceConfig: { voiceName } },
      },
    },
    callbacks,
  });
};
