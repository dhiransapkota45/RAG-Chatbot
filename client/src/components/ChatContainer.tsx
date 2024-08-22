import Chat from "./Chat";

const ChatContainer = () => {
  return (
    <div className="flex-1 overflow-hidden flex flex-col px-3 gap-3 ">
      <div className="flex-1 overflow-hidden ">
        <Chat />
      </div>
      <form className="mb-6 flex gap-1 ">
        <input
          className="ring-2 focus:ring-blue-500 ring-gray-200 rounded-3xl flex-1 outline-none p-4"
          type="text"
          placeholder="Type a message"
        />
        <button
          type="submit"
          className="  py-2 bg-blue-500 text-white rounded-3xl w-28 font-semibold"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatContainer;
