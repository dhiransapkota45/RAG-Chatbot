import { OpenAIEmbeddings } from "@langchain/openai";
import { createClient } from "@supabase/supabase-js";
import { config } from "../config/config";
import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";

const getRetriver = () => {
  const embeddings = new OpenAIEmbeddings({
    openAIApiKey: config.OPENAI_API_KEY,
  });
  const supabaseClient = createClient(config.SUPABASE_URL, config.SUPABASE_KEY);

  const vectorStore = new SupabaseVectorStore(embeddings, {
    client: supabaseClient,
    tableName: "documents",
    queryName: "match_documents",
  });

  const retriver = vectorStore.asRetriever();
  return retriver;
};
export default getRetriver;
