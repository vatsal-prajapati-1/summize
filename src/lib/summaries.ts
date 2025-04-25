import { getDbConnection } from "./db";

const getSummaries = async (userId: string) => {
  const sql = await getDbConnection();
  const summaries =
    await sql`SELECT * FROM pdf_summaries WHERE user_id = ${userId} ORDER BY created_at DESC`;
  return summaries;
};

const getSummaryById = async (id: string) => {
  try {
    const sql = await getDbConnection();
    const [summary] =
      await sql`SELECT id, user_id, title, original_file_url, summary_text, status, created_at, updated_at,  file_name, LENGTH(summary_text) - LENGTH(REPLACE(summary_text, '', '')) + 1 as word_count FROM pdf_summaries WHERE id = ${id}`;
    return summary;
  } catch (error) {
    console.error("Error fetching summary by id", error);
    return null;
  }
};

export { getSummaries, getSummaryById };
