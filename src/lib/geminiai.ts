import { GoogleGenerativeAI } from "@google/generative-ai";
import SUMMARY_SYSTEM_PROMPT from "@/utils/prompts";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

interface GeminiOptions {
  model?: string;
  maxOutputTokens?: number;
  temperature?: number;
}

const generateSummaryFromGemini = async (
  pdfText: string,
  options?: GeminiOptions
): Promise<string> => {
  try {
    if (!pdfText?.trim()) {
      throw new Error("EMPTY_INPUT_TEXT");
    }

    const model = genAI.getGenerativeModel({
      model: options?.model || "gemini-1.5-flash-latest",
      generationConfig: {
        temperature: options?.temperature ?? 0.7,
        maxOutputTokens: options?.maxOutputTokens ?? 1500,
      },
    });

    const prompt = {
      contents: [
        {
          role: "user",
          parts: [
            { text: SUMMARY_SYSTEM_PROMPT },
            {
              text: `Transform this document into an engaging, easy-to-read summary with contextually relevant emojis and proper markdown formatting:\n\n${pdfText}`,
            },
          ],
        },
      ],
    };

    const result = await model.generateContent(prompt);
    const response = result.response;
    const summary = response.text();

    if (!summary?.trim()) {
      throw new Error("EMPTY_RESPONSE");
    }

    return summary;
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    
    if (error?.message?.includes("API key not valid")) {
      throw new Error("INVALID_API_KEY");
    }
    if (error?.message?.includes("quota")) {
      throw new Error("QUOTA_EXCEEDED");
    }
    if (error?.status === 429) {
      throw new Error("RATE_LIMIT_EXCEEDED");
    }
    
    throw new Error("GEMINI_API_ERROR");
  }
};

export default generateSummaryFromGemini;
