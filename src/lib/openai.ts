import SUMMARY_SYSTEM_PROMPT from "@/utils/prompts";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const generateSummaryFromOpenAI = async (pdfText: string): Promise<string> => {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: SUMMARY_SYSTEM_PROMPT },
        {
          role: "user",
          content: `Transform this document into an engaging, easy-to-read summary with contextually relevant emojis and proper markdown formatting:\n\n${pdfText}`,
        },
      ],
      temperature: 0.7,
      max_tokens: 1500,
    });

    if (!completion.choices[0]?.message?.content) {
      throw new Error("No content received from OpenAI");
    }

    return completion.choices[0].message.content;
  } catch (error: any) {
    if (error.status === 429) {
      throw new Error("Rate limit exceeded");
    }
    if (error.response?.status === 401) {
      throw new Error("Invalid API key");
    }
    throw error;
  }
};

export default generateSummaryFromOpenAI;
