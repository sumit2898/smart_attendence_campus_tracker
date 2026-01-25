
import { GoogleGenAI, Type } from "@google/genai";
import { AttendanceRecord } from "../types";

const getAIClient = () => {
  const apiKey = process.env.API_KEY || "dummy_key";
  return new GoogleGenAI({ apiKey });
};

export async function analyzeAttendanceTrends(records: AttendanceRecord[]) {
  try {
    const prompt = `
      Analyze the following attendance data for campus students. 
      Identify students at risk of failing due to poor attendance.
      Provide a "Risk Score" (0-100) and specific recommendations for each student.
      
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
            analysis: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  studentName: { type: Type.STRING },
                  riskScore: { type: Type.NUMBER },
                  status: { type: Type.STRING },
                  recommendation: { type: Type.STRING }
                }
              }
            }
          }
        }
      }
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("AI Analysis failed:", error);
    return null;
  }
}
