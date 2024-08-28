import { useEffect, useState } from "react";
import { AuthContextType, useAuthContext } from "../context/AuthContext";
import {
  TConversationPayload,
  TConversationResponse,
  TMessagePayload,
} from "../types/types";
import { mutate, promptLlm } from "../api/api";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";

const MessageBox = ({
  setMessages,
}: {
  setMessages: React.Dispatch<React.SetStateAction<TMessagePayload[]>>;
}) => {
  const navigate = useNavigate();
  const [userInput, setUserInput] = useState("");
  const [assistantResponse, setAssistantResponse] = useState("");
  const { isLoggedin, conversationId } = useAuthContext() as AuthContextType;

  const startConversationLlm = (
    conversationid: string | undefined = undefined
  ) => {
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
    const payload: TConversationPayload = {
      prompt: userInput,
    };
    if (conversationid) {
      payload["conversationId"] = conversationid;
    }
    promptLlm(payload, setAssistantResponse);
  };

  const mutateConversation = useMutation({
    mutationFn: () =>
      mutate<TConversationResponse>("conversation", "post", {
        title: userInput,
      }),
    onSuccess: (data) => {
      navigate(`/?conversation=${data.data.conversation.id}`);
      startConversationLlm(data.data.conversation.id);
    },
  });

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isLoggedin) {
      return startConversationLlm();
    }
    if (!conversationId) {
      return mutateConversation.mutate();
    }
    startConversationLlm(conversationId);
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
