import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";

const fetchAndExtractPdfText = async (fileUrl: string): Promise<string> => {
  try {
    const response = await fetch(fileUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch PDF: ${response.statusText}`);
    }

    const blob = await response.blob();
    const loader = new PDFLoader(blob); 

    const docs = await loader.load();
    return docs.map((doc) => doc.pageContent).join("\n");
  } catch (error) {
    console.error("Error processing PDF:", error);
    throw new Error("Failed to extract text from PDF");
  }
};

export default fetchAndExtractPdfText;
