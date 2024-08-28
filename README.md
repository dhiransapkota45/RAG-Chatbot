# RAG Chatbot Using Express.js, Langchain.js, Supabase, React, and TailwindCSS

## Overview

This project is a specialized chatbot application similar to ChatGPT(design inspiration), designed for retrieval-augmented generation (RAG). The chatbot is built using a combination of modern technologies:

- **Backend:** Express.js and Langchain.js
- **Frontend:** React.js and TailwindCSS
- **Database and Authentication:** Supabase

The chatbot can specialize in a specific topic by storing knowledge provided in a `knowledge.txt` file, which is then processed and stored in Supabase with vector embeddings. The application allows interaction with various large language models by configuring API keys in the environment file.

## Table of Contents

1. [Getting Started](#getting-started)
2. [Knowledge Upload Phase](#knowledge-upload-phase)
3. [Interacting with the Chatbot](#interacting-with-the-chatbot)
4. [Environment Configuration](#environment-configuration)
5. [Supabase Integration](#supabase-integration)
6. [Frontend Implementation](#frontend-implementation)
7. [Running the Application](#running-the-application)
8. [Future Improvements](#future-improvements)

## Getting Started

### Prerequisites

Ensure that you have the following tools installed on your local development environment:

- Node.js
- npm or Yarn
- Supabase account
- API keys for the large language models you intend to use

### Installation

1. Clone the repository:

   ```bash
   git clone git@github.com:dhiransapkota45/RAG-Chatbot.git
   cd RAG-Chatbot
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Set up the environment variables as described in the [Environment Configuration](#environment-configuration) section.

## Knowledge Upload Phase

The knowledge upload phase allows you to specialize the chatbot on a specific topic by providing it with a `knowledge.txt` file. This file contains the information that the chatbot will use to answer questions related to the specified topic.

### Process

1. **Prepare the `knowledge.txt` File:**
   - Ensure that the file contains well-structured relevant information and divided into chunks.(While dividing into chunks two lines seperator gets most priority to single line to " " and then "".)
   - A chunk can be around 8 lines. Note that these priorties and token sizes on a single chunk can be modified from the code. 
   - It is recommended to put the information in Q/A format.
   - Place the `knowledge.txt` file in the root directory of the project.

2. **Upload Knowledge:**
   - Upload the knowledge to supabase by running `npm run upload`.

3. **Verification:**
   - After the upload, the knowledge is available at your supabase project dashboard.

## Interacting with the Chatbot

Once the knowledge is uploaded, users can interact with the chatbot through the frontend interface built with React and TailwindCSS. The chatbot retrieves the relevant information from Supabase and generates responses using the specified large language model.

### Key Features

- **Real-time Chat:** Users can type their queries, and the chatbot responds in real-time.
- **Specialized Responses:** The chatbot provides answers based on the knowledge uploaded, ensuring topic-specific expertise.

## Environment Configuration

To connect with different large language models and Supabase, you need to configure the environment variables. (For now chat is possible only with openai but I will make changes to that soon.)

### Backend `.env` File
##### create a .env file at the root of the project.

```plaintext
SUPABASE_PROJECT_URL=SUPABASE_PROJECT_URL
SUPABASE_API_KEY=SUPABASE_API_KEY
OPENAI_API_KEY=OPENAI_API_KEY
GEMINI_API_KEY=GEMINI_API_KEY
BASE_URL=http://localhost:3000
```

### Frontend `.env` File
##### create a .env file inside client folder.

```plaintext
VITE_SUPABASE_PROJECT_URL=SUPABASE_PROJECT_URL
VITE_SUPABASE_API_KEY=SUPABASE_API_KEY
VITE_BACKENDURL=http://localhost:3000
```

## Supabase Integration

Supabase is used for both user authentication and data storage, conversation history, including storing vector embeddings of the knowledge base.

### Setting Up Supabase

1. **Create a Supabase Project:**
   - Go to [Supabase](https://supabase.com/) and create a new project.
   - Get your `SUPABASE_URL` and `SUPABASE_KEY` from the project settings.

2. **Database Schema:**
Create 3 tables in supabase.
- First create a table named documents. To do so run the following query in sql query section of supabase 
```
-- Enable the pgvector extension to work with embedding vectors
create extension vector;

-- Create a table to store your documents
create table documents (
  id bigserial primary key,
  content text, -- corresponds to Document.pageContent
  metadata jsonb, -- corresponds to Document.metadata
  embedding vector(1536) -- 1536 works for OpenAI embeddings, change if needed
);

-- Create a function to search for documents
create function match_documents (
  query_embedding vector(1536),
  match_count int default null,
  filter jsonb DEFAULT '{}'
) returns table (
  id bigint,
  content text,
  metadata jsonb,
  similarity float
)
language plpgsql
as $$
#variable_conflict use_column
begin
  return query
  select
    id,
    content,
    metadata,
    1 - (documents.embedding <=> query_embedding) as similarity
  from documents
  where metadata @> filter
  order by documents.embedding <=> query_embedding
  limit match_count;
end;
$$;

```
This query script is also available at langchainjs documentation.

- Second create ``Messages`` table 
- Third, create ``Chat`` table 

3. **Authentication:**
   - Set up google authentication using Supabase and google console.

## Frontend Implementation

The frontend is built using React and styled with TailwindCSS to provide a modern, responsive user interface.


### Styling

TailwindCSS is used for all styling purposes. 

## Running the Application

### Development Mode

To run the application in development mode:

1. **Backend:**

   ```bash
   npm run serve
   ```

2. **Frontend:**

   ```bash
   cd client
   npm run dev
   ```

### Production Mode

For production deployment, ensure that both the backend and frontend are correctly built and deployed on your chosen platform.

## Future Improvements

Following enhancements can be considered for future enhancements of the project:

- **User level file based RAG Support:** For now whole application has single vector database in one specific topic. We could make user upload their desired file, finetune them and get least costly response with context to that file from LLM's.
---

This documentation should help you set up, configure, and run your this chatbot application. For further assistance, consult the respective documentation of Express.js, Langchain.js, Supabase, React, and TailwindCSS.
