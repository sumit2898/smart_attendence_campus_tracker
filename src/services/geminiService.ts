
import { GoogleGenAI, Type } from "@google/genai";
import { AttendanceRecord, AIAnalysisResult } from "../types";

const getAIClient = () => {
  const apiKey = process.env.API_KEY || "dummy_key";
  return new GoogleGenAI({ apiKey });
};

export async function analyzeAttendanceTrends(records: AttendanceRecord[]): Promise<AIAnalysisResult | null> {
  try {
    const prompt = `
      Analyze the attendance data for the student "Alex Johnson". 
      Determine their risk of failing based on attendance patterns.
      Return a risk score (0-100), status (SAFE, WARNING, CRITICAL), and a short recommendation.
      
      Data: ${JSON.stringify(records)}
    `;

    const ai = getAIClient();
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            riskScore: { type: Type.NUMBER },
            status: { type: Type.STRING, enum: ["SAFE", "WARNING", "CRITICAL"] },
            recommendation: { type: Type.STRING }
          },
          required: ["riskScore", "status", "recommendation"]
        }
      }
    });

    if (response.text) {
      const data = JSON.parse(response.text);
      return {
        ...data,
        lastUpdated: Date.now()
      };
    }
    return null;
  } catch (error) {
    console.error("AI Analysis failed:", error);
    return null;
  }
}
