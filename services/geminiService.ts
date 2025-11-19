import { GoogleGenAI } from "@google/genai";
import { Language } from "../types";

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key not found");
  }
  return new GoogleGenAI({ apiKey });
};

export const analyzeImageContext = async (contextDescription: string, language: Language): Promise<string> => {
  try {
    const ai = getClient();
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `
        You are a high-brow art curator for a photography exhibition titled "Refracting the World".
        The theme is "The Fluidity of Truth" and "Accuracy vs. Distortion".
        
        Analyze the following visual context and generate a short, provocative 2-sentence curatorial question
        that challenges the viewer's trust in the image based on this description: "${contextDescription}".
        
        Tone: Intellectual, philosophical, slightly mysterious.
        IMPORTANT: Provide the response in ${language === 'fr' ? 'French' : 'English'}.
      `,
    });
    return response.text || (language === 'fr' ? "L'objectif capture-t-il la réalité, ou ne fait-il que la curater ?" : "Does the lens capture reality, or merely curate it?");
  } catch (error) {
    console.error("Gemini API Error:", error);
    return language === 'fr' ? "L'objectif capture-t-il la réalité, ou ne fait-il que la curater ?" : "Does the lens capture reality, or merely curate it?";
  }
};

export const explainTechnique = async (topic: string, language: Language): Promise<string> => {
  try {
    const ai = getClient();
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `
        You are an expert historian of photography. Explain the following concept in the context of photography's evolution
        from Niépce's heliography to modern AI generation. 
        
        Topic: "${topic}"
        
        Keep it concise (max 100 words), educational, and engaging. Connect historical roots to modern digital practices.
        IMPORTANT: Provide the response in ${language === 'fr' ? 'French' : 'English'}.
      `,
    });
    return response.text || (language === 'fr' ? "La photographie a toujours été une danse entre la lumière et la chimie, évoluant désormais vers les données et les algorithmes." : "Photography has always been a dance between light and chemistry, now evolving into data and algorithms.");
  } catch (error) {
    console.error("Gemini API Error:", error);
    return language === 'fr' ? "Impossible de récupérer le contexte historique pour le moment." : "Unable to retrieve historical context at this moment.";
  }
};

export const generateThematicImage = async (prompt: string): Promise<string | null> => {
  try {
    const ai = getClient();
    const response = await ai.models.generateImages({
      model: 'imagen-4.0-generate-001',
      prompt: prompt,
      config: {
        numberOfImages: 1,
        outputMimeType: 'image/jpeg',
        aspectRatio: '16:9',
      },
    });

    const base64ImageBytes = response.generatedImages?.[0]?.image?.imageBytes;
    if (base64ImageBytes) {
      return `data:image/jpeg;base64,${base64ImageBytes}`;
    }
    return null;
  } catch (error) {
    console.error("Gemini Image Gen Error:", error);
    return null;
  }
};

export const summarizeManifesto = async (manifestoPoints: string[], language: Language): Promise<string> => {
  try {
    const ai = getClient();
    const prompt = `
      You are a strategic consultant for a cultural non-profit.
      Summarize the following strategic pillars of a photography project into a single, compelling, professional paragraph.
      
      Pillars:
      ${manifestoPoints.join('\n')}
      
      Tone: Professional, visionary, concise.
      IMPORTANT: Provide the response in ${language === 'fr' ? 'French' : 'English'}.
    `;
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text || "Summary generation failed.";
  } catch (error) {
    console.error("Gemini Summary Error:", error);
    return language === 'fr' ? "Impossible de générer le résumé." : "Unable to generate summary.";
  }
};