import { GoogleGenAI } from "@google/genai";

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key not found");
  }
  return new GoogleGenAI({ apiKey });
};

export const analyzeImageContext = async (contextDescription: string): Promise<string> => {
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
      `,
    });
    return response.text || "Does the lens capture reality, or merely curate it?";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Does the lens capture reality, or merely curate it?";
  }
};

export const explainTechnique = async (topic: string): Promise<string> => {
  try {
    const ai = getClient();
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `
        You are an expert historian of photography. Explain the following concept in the context of photography's evolution
        from Niépce's heliography to modern AI generation. 
        
        Topic: "${topic}"
        
        Keep it concise (max 100 words), educational, and engaging. Connect historical roots to modern digital practices.
      `,
    });
    return response.text || "Photography has always been a dance between light and chemistry, now evolving into data and algorithms.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Unable to retrieve historical context at this moment.";
  }
};