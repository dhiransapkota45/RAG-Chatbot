import { TMessagePayload } from "../types/types";

const chatdata = {
  id: 1,
  generator: "assistant",
  message: "Hi there! How can I help you today?",
  created_at: "2021-09-01T12:00:00",
  chat: "none",
};
const Chat = ({ messages }: { messages: TMessagePayload[] }) => {
  return (
    <div className=" h-full flex-col-reverse flex gap-3 overflow-y-auto">
      {messages?.map((chat) => {
        return (
          <div
            key={chat.message}
            className={`flex  ${
              chat.generator === "assistant" ? "" : "justify-end"
            }`}
          >
            <div
              className={`  max-w-[70%] p-3 rounded-xl  ${
                chat.generator === "assistant"
                  ? "bg-gray-200"
                  : "bg-blue-500 text-white"
              }`}
            >
              {chat.message}
            </div>
          </div>
        );
      })}
      <div className={`flex `}>
        <div className={`  max-w-[70%] p-3 rounded-xl bg-gray-200`}>
          {chatdata.message}
        </div>
      </div>
    </div>
  );
};

export default Chat;
