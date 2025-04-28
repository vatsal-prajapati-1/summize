import SUMMARY_SYSTEM_PROMPT from "@/utils/prompts";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  maxRetries: 3,
  timeout: 30000
});

const generateSummaryFromOpenAI = async (pdfText: string, attempt = 1): Promise<string> => {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: SUMMARY_SYSTEM_PROMPT },
        {
          role: "user",
          content: `Transform this document into an engaging, easy-to-read summary with contextually relevant emojis and proper markdown formatting:\n\n${pdfText}`,
        },
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    if (!completion.choices[0]?.message?.content) {
      throw new Error("EMPTY_RESPONSE");
    }

    return completion.choices[0].message.content;
  } catch (error: any) {
    if (error?.status === 429 && attempt <= 3) {
      const delay = Math.pow(2, attempt) * 1000;
      await new Promise(resolve => setTimeout(resolve, delay));
      return generateSummaryFromOpenAI(pdfText, attempt + 1);
    }
    if (error?.status === 429) {
      throw new Error("RATE_LIMIT_EXCEEDED");
    }
    throw error;
  }
};

export default generateSummaryFromOpenAI;
