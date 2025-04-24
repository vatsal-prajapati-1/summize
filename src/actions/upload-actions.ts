"use server";
import generateSummaryFromGemini from "@/lib/geminiai";
import fetchAndExtractPdfText from "@/lib/langchain";
import generateSummaryFromOpenAI from "@/lib/openai";

const generatePdfSummary = async (
  uploadResponse: [
    {
      serverData: {
        userId: string;
        file: {
          url: string;
          name: string;
        };
      };
    }
  ]
) => {
  if (!uploadResponse) {
    return {
      success: false,
      message: "File upload failed",
      data: null,
    };
  }

  const {
    serverData: {
      userId,
      file: { url: pdfUrl, name: fileName },
    },
  } = uploadResponse[0];

  if (!pdfUrl) {
    return {
      success: false,
      message: "File upload failed",
      data: null,
    };
  }

  try {
    const pdfText = await fetchAndExtractPdfText(pdfUrl);

    console.log("{pdfText}", pdfText);

    console.log(pdfText, "this is full pdf text should be console logged");

    let summary;

    try {
      summary = await generateSummaryFromOpenAI(pdfText);
      console.log({ summary }, "this is the open ai summary");
    } catch (error) {
      console.log(error, "this is the error");
      if (error instanceof Error && error.message === "RATE_LIMIT_EXCEEDED") {
        try {
          summary = await generateSummaryFromGemini(pdfText);
          console.log({ summary }, "this is the gemini summary");
        } catch (geminiError) {
          console.error(
            "Gemini API failed after OpenAI quote exceeded",
            geminiError
          );
          throw new Error(
            "Failed to generate summary with available AI providers"
          );
        }
      }
    }

    if (!summary) {
      return {
        success: false,
        message: "Failed to generate summary",
        data: null,
      };
    }
    return {
      success: true,
      message: "Summary generated successfully",
      data: {
        summary,
      },
    };
  } catch (error) {
    return {
      success: false,
      message: "File upload failed",
      data: null,
    };
  }
};

export default generatePdfSummary;
