"use server";
import { getDbConnection } from "@/lib/db";
import generateSummaryFromGemini from "@/lib/geminiai";
import fetchAndExtractPdfText from "@/lib/langchain";
import generateSummaryFromOpenAI from "@/lib/openai";
import formatFileNameAsTitle from "@/utils/format-utils";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

interface PdfSummaryType {
  userId?: string;
  file_url: string;
  summary: string;
  title: string;
  fileName: string;
}

const generatedPdfText = async ({ fileUrl }: { fileUrl: string }) => {
  if (!fileUrl) {
    return {
      success: false,
      message: "File upload failed",
      data: null,
    };
  }

  try {
    const pdfText = await fetchAndExtractPdfText(fileUrl);

    console.log("file url is should be console logged", fileUrl);

    console.log({ pdfText }, "this is full pdf text should be console logged");

    if (!pdfText) {
      return {
        success: false,
        message: "Failed to fetch and extract PDF text",
        data: null,
      };
    }

    return {
      success: true,
      message: "PDF text generated successfully",
      data: {
        pdfText,
      },
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed to fetch and extract PDF text",
      data: null,
    };
  }
};

const generatePdfSummary = async ({
  pdfText,
  fileName,
}: {
  pdfText: string;
  fileName: string;
}) => {
  try {
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
            "Failed to generate summary with available AI viders"
          );
        }
      }
      return {
        success: false,
        message: "Failed to generate summary",
        data: null,
      };
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
        title: fileName,
        summary,
      },
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed to generate summary",
      data: null,
    };
  }
};

const savePdfSummary = async ({
  userId,
  file_url,
  summary,
  title,
  fileName,
}: PdfSummaryType) => {
  try {
    const sql = await getDbConnection();

    const [savedSummary] =
      await sql`INSERT INTO pdf_summaries (user_id, original_file_url, summary_text, title, file_name) VALUES (${userId}, ${file_url}, ${summary}, ${title}, ${fileName}) RETURNING id, summary_text`;
    return savedSummary;
  } catch (error) {
    console.error("Error saving PDF summary", error);
    throw error;
  }
};

const storePdfSummaryAction = async ({
  file_url,
  summary,
  title,
  fileName,
}: PdfSummaryType) => {
  let savedSummary: any;

  try {
    const { userId } = await auth();

    if (!userId) {
      return {
        success: false,
        message: "User not found",
      };
    }
    savedSummary = await savePdfSummary({
      userId,
      file_url,
      summary,
      title,
      fileName,
    });

    if (!savedSummary) {
      return {
        success: false,
        message: "Failed to save PDF summary, please try again...",
      };
    }
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Error Saving PDF summary",
    };
  }

  revalidatePath(`/summaries/${savedSummary?.id}`);

  return {
    success: true,
    message: "PDF summary saved successfully",
    data: {
      id: savedSummary?.id,
    },
  };
};

export { generatePdfSummary, storePdfSummaryAction, generatedPdfText };
