import fs from "fs";
import path from "path";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

const filePath = path.join(__dirname, "knowledge.txt");
const data = fs.readFileSync(filePath, { encoding: "utf-8" });

const splitter = new RecursiveCharacterTextSplitter({ chunkSize: 500 });

splitter.createDocuments([data]).then((result) => {
  fs.writeFileSync(
    path.join(__dirname, "output.json"),
    JSON.stringify(result, null, 2)
  );
});
console.log("rerunning");
