import SUMMARY_SYSTEM_PROMPT from "@/utils/prompts";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  maxRetries: 3,
  timeout: 30000,
});

const DEFAULT_MODEL = "gpt-4.1";
const DEFAULT_MAX_TOKENS = 1500;

interface SummaryOptions {
  model?: string;
  maxTokens?: number;
  temperature?: number;
}

const generateSummaryFromOpenAI = async (
  pdfText: string,
  options?: SummaryOptions
): Promise<string> => {
  try {
    if (!pdfText?.trim()) {
      throw new Error("EMPTY_INPUT_TEXT");
    }

    const completion = await openai.chat.completions.create({
      model: options?.model || DEFAULT_MODEL,
      messages: [
        { role: "system", content: SUMMARY_SYSTEM_PROMPT },
        {
          role: "user",
          content: `Transform this document into an engaging, easy-to-read summary with contextually relevant emojis and proper markdown formatting:\n\n${pdfText}`,
        },
      ],
      temperature: options?.temperature ?? 0.7,
      max_tokens: options?.maxTokens ?? DEFAULT_MAX_TOKENS,
    });

    const summary = completion.choices[0]?.message?.content;
    if (!summary?.trim()) {
      throw new Error("EMPTY_RESPONSE");
    }

    return summary;
  } catch (error: any) {
    console.error("OpenAI API Error:", error);
    
    if (error?.status === 429 || error?.code === 'insufficient_quota') {
      throw new Error("RATE_LIMIT_EXCEEDED");
    }
    if (error?.response?.status === 401) {
      throw new Error("INVALID_API_KEY");
    }
    if (error?.code === "context_length_exceeded") {
      throw new Error("CONTEXT_TOO_LONG");
    }
    
    throw new Error("OPENAI_API_ERROR");
  }
};

export default generateSummaryFromOpenAI;
