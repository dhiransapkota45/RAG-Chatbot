import { useState } from "react";
import Chat from "./Chat";
import MessageBox from "./MessageBox";
import { TMessagePayload } from "../types/types";

const ChatContainer = () => {
  const [messages, setMessages] = useState<TMessagePayload[]>([]);

  return (
    <div className="flex-1 overflow-hidden flex flex-col px-3 gap-3 ">
      <div className="flex-1 overflow-hidden ">
        <Chat messages={messages} />
      </div>
      <MessageBox setMessages={setMessages} />
    </div>
  );
};

export default ChatContainer;
