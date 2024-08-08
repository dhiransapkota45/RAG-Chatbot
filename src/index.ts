import { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { config } from "./config";
import { StringOutputParser } from "@langchain/core/output_parsers";
import getRetriver from "./retriver";
import combineNearestVector from "./combineNearestVector";
import {
  RunnablePassthrough,
  RunnableSequence,
} from "@langchain/core/runnables";
import { IterableReadableStream } from "@langchain/core/utils/stream";

export const promptParser: (
  question: string
) => Promise<IterableReadableStream<string>> = async (question) => {
  const llmOpenAI = new ChatOpenAI({
    openAIApiKey: config.OPENAI_API_KEY,
  });

  //question chain
  const questionTemplate = `Convert the following question into standalone Question: {question} Standalone question:`;
  const questionPrompt = PromptTemplate.fromTemplate(questionTemplate);
  const questionChain = RunnableSequence.from([
    questionPrompt,
    llmOpenAI,
    new StringOutputParser(),
  ]);

  //retriver chain to minimize the token usage
  const retriverChain = RunnableSequence.from([
    (data) => data.standaloneQuestion,
    { data: getRetriver() },
    (data) => {
      return combineNearestVector(data?.data);
    },
  ]);

  //answer chain
  const answerTemplate = `You are a helpful and enthusiastic chat bot who can answer the provided question based on context provided. Try to find the answer in the context. If you really can't find the answer, you can say "I'm sorry, I don't know answer to that". Don't try to make up the answer. Always speak as if you are chatting with a friend.
  context : {context}
  question : {question}
  answer:`;
  const answerPrompt = PromptTemplate.fromTemplate(answerTemplate);
  const answerChain = RunnableSequence.from([
    answerPrompt,
    llmOpenAI,
    new StringOutputParser(),
  ]);

  //using runnablesequence which is more readable
  const chain = RunnableSequence.from([
    {
      standaloneQuestion: questionChain,
      original_question: new RunnablePassthrough(),
    },
    {
      context: retriverChain,
      question: ({ original_question }) => original_question?.question,
    },
    answerChain,
  ]);
  const response = await chain.stream({
    question,
  });
  return response;
};

//using pipeline
// const chain = userPrompt
//   .pipe(llmOpenAI)
//   .pipe(new StringOutputParser())
//   .pipe(getRetriver())
//   .pipe(combineNearestVector)
//   .pipe(answerPrompt);
