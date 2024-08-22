const chatdata = [
  {
    id: 1,
    name: "assistant",
    message: "Hello, how are you?",
  },
  {
    id: 2,
    name: "user",
    message: "I am fine, thank you.",
  },
  {
    id: 3,
    name: "assistant",
    message: "How can I help you today?",
  },
  {
    id: 4,
    name: "user",
    message: "I am looking for a book.",
  },
  {
    id: 5,
    name: "assistant",
    message: "What kind of book are you looking for?",
  },
  {
    id: 6,
    name: "user",
    message: "I am looking for a book on React.",
  },
  {
    id: 7,
    name: "assistant",
    message: 'We have a book on React, titled "React for Beginners".',
  },
  {
    id: 8,
    name: "user",
    message: "Can you show me the table of contents?",
  },
  {
    id: 9,
    name: "assistant",
    message: "Sure, here is the table of contents:",
  },
  {
    id: 10,
    name: "assistant",
    message: "1. Introduction to React",
  },
  {
    id: 11,
    name: "assistant",
    message: "2. Setting up a React Environment",
  },
  {
    id: 12,
    name: "assistant",
    message: "3. Components and Props",
  },
  {
    id: 13,
    name: "assistant",
    message: "4. State and Lifecycle",
  },
  {
    id: 14,
    name: "assistant",
    message: "5. Handling Events",
  },
  {
    id: 15,
    name: "assistant",
    message: "6. Conditional Rendering",
  },
  {
    id: 16,
    name: "assistant",
    message: "7. Lists and Keys",
  },
  {
    id: 17,
    name: "assistant",
    message: "8. Forms",
  },
  {
    id: 18,
    name: "assistant",
    message: "9. Lifting State Up",
  },
  {
    id: 19,
    name: "assistant",
    message: "10. Composition vs Inheritance",
  },
  {
    id: 20,
    name: "assistant",
    message: "11. Thinking in React",
  },
  {
    id: 21,
    name: "assistant",
    message: "12. React Hooks",
  },
  {
    id: 22,
    name: "assistant",
    message: "13. React Router",
  },
  {
    id: 23,
    name: "assistant",
    message: "14. Redux",
  },
];

const Chat = () => {
  return (
    <div className=" h-full flex-col-reverse flex gap-3 overflow-auto">
      {chatdata?.map((chat) => {
        return (
          <div key={chat.id} className={`flex  ${
                chat.name === "assistant" ? "" : "justify-end"
              }`}>
            <div
              key={chat.id}
              className={`  max-w-[70%] p-3 rounded-xl  ${chat.name === "assistant" ? "bg-gray-200" : "bg-blue-500 text-white"}`}
            >
              {chat.message}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Chat;
