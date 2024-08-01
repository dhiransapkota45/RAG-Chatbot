import fs from "fs";
import path from "path";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { createClient } from "@supabase/supabase-js";
import { config } from "./config";
import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";
import { OpenAIEmbeddings } from "@langchain/openai";

const filePath = path.join(__dirname, "knowledge.txt");
const data = fs.readFileSync(filePath, { encoding: "utf-8" });

const updaloadKnowledgeSupabase = async () => {
  try {
    const splitter = new RecursiveCharacterTextSplitter({ chunkSize: 500 });

    const chunks = await splitter.createDocuments([data]);

    const supabaseClient = createClient(
      config.SUPABASE_URL,
      config.SUPABASE_KEY
    );

    await SupabaseVectorStore.fromDocuments(
      chunks,
      new OpenAIEmbeddings({ openAIApiKey: config.OPENAI_API_KEY }),
      {
        client: supabaseClient,
        tableName: "documents",
      }
    );
    console.log("data uploaded");
  } catch (error) {
    console.log(error);
  }
};

updaloadKnowledgeSupabase();
