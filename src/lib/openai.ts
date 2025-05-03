import SUMMARY_SYSTEM_PROMPT from "@/utils/prompts";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const generateSummaryFromOpenAI = async (pdfText: string) => {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4.1",
      messages: [
        { role: "system", content: SUMMARY_SYSTEM_PROMPT },
        {
          role: "user",
          content: `Transform this document into an engaging, easy-to-read summary with contextually relevant emojis and proper markdown formatting:\n\n${pdfText}`,
        },
      ],
      temperature: 0.7,
      // max_tokens: 1500,
      max_tokens: 1000,
    });

    // if (!completion.choices[0]?.message?.content) {
    //   throw new Error("EMPTY_RESPONSE");
    // }

    return completion.choices[0].message.content;
  } catch (error: any) {
    if (error?.status === 429) {
      throw new Error("RATE_LIMIT_EXCEEDED", error);
    }
    throw error;
  }
};

export default generateSummaryFromOpenAI;
