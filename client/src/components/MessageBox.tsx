import { useEffect, useState } from "react";
import { AuthContextType, useAuthContext } from "../context/AuthContext";
import { TMessagePayload } from "../types/types";
import { promptLlm } from "../api/api";

const MessageBox = ({
  setMessages,
}: {
  setMessages: React.Dispatch<React.SetStateAction<TMessagePayload[]>>;
}) => {
  const [userInput, setUserInput] = useState("");
  const [assistantResponse, setAssistantResponse] = useState("");
  const { isLoggedin, conversationId } = useAuthContext() as AuthContextType;

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoggedin && !conversationId) {
      console.log("now it should hit the api");
    }
    setMessages((prev) => [
      {
        generator: "assistant",
        message: "",
      },
      {
        generator: "user",
        message: userInput,
      },
      ...prev,
    ]);
    setUserInput("");

    promptLlm(userInput, setAssistantResponse);
  };

  useEffect(() => {
    if (assistantResponse) {
      //update the first message
      setMessages((prev) => {
        const updatedMessages = [...prev];
        updatedMessages[0].message = assistantResponse;
        return updatedMessages;
      });
    }
  }, [assistantResponse]);
  return (
    <form onSubmit={submitHandler} className="mb-6 flex gap-1 ">
      <input
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        className="ring-2 focus:ring-blue-500 animation ring-gray-200 rounded-3xl flex-1 outline-none p-4"
        type="text"
        placeholder="Type a message"
      />
      <button
        disabled={!userInput}
        type="submit"
        className="  py-2 bg-blue-500 animation disabled:bg-blue-300 text-white rounded-3xl w-28 font-semibold"
      >
        Send
      </button>
    </form>
  );
};

export default MessageBox;
