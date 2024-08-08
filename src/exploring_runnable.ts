import { ChatOpenAI } from "@langchain/openai";
import { config } from "./config/config";
import { PromptTemplate } from "@langchain/core/prompts";
import {
  RunnableSequence,
  RunnablePassthrough,
} from "@langchain/core/runnables";
import { StringOutputParser } from "@langchain/core/output_parsers";

const input = "i dont liked mondays";

//correct punctuation, grammar and then convert it to hindi

const exploreRunnable = async () => {
  const llmOpenAI = new ChatOpenAI({
    openAIApiKey: config.OPENAI_API_KEY,
  });

  // punctuation chain
  const punctuationTemplate = `Correct the punctuation of following sentence: {sentence} Answer:`;
  const punctuationPrompt = PromptTemplate.fromTemplate(punctuationTemplate);
  const punctuationChain = RunnableSequence.from([
    punctuationPrompt,
    llmOpenAI,
    new StringOutputParser(),
  ]);

  //grammar chain
  const grammarTemplate = `Correct the grammar of following sentence: {sentence_for_grammar} Answer:`;
  const grammarPrompt = PromptTemplate.fromTemplate(grammarTemplate);

  const grammarChain = RunnableSequence.from([
    grammarPrompt,
    llmOpenAI,
    new StringOutputParser(),
  ]);

  //language chain
  const languageTemplate = `Convert the following sentence into {language}: {sentence_for_language} Answer:`;
  const languagePrompt = PromptTemplate.fromTemplate(languageTemplate);
  const languageChain = RunnableSequence.from([
    languagePrompt,
    llmOpenAI,
    new StringOutputParser(),
  ]);

  const runnableChain = RunnableSequence.from([
    {
      sentence_for_grammar: punctuationChain,
      original_input: new RunnablePassthrough(),
    },
    {
      sentence_for_language: grammarChain,
      language: ({ original_input }) => original_input.language,
    },
    languageChain,
  ]);

  const response = await runnableChain.invoke({
    sentence: input,
    language: "hindi",
  });
  console.log(response);
};

exploreRunnable();
