const chatForm = document.getElementById("chat-form");
const chatMessages = document.getElementById("chat-messages");
const chatInput = document.getElementById("chat-input");

chatForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const text = chatInput.value;

  chatMessages.insertBefore(promptElement(text), chatMessages.firstChild);
  chatForm.reset();
  chatMessages.scrollTop = 100;

  //getting stream response from server
  const response = await fetch("http://localhost:3000/api/prompt", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt: text }),
  });
  const reader = response.body.getReader();
  const decoder = new TextDecoder();

  const chatResponseElement = createResponseElement();
  chatMessages.insertBefore(
    chatResponseElement.container,
    chatMessages.firstChild
  );

  while (true) {
    const { done, value } = await reader.read();
    if (done) {
      break;
    }
    const chunk = decoder.decode(value, { stream: true });
    chatResponseElement.contentHolder.textContent += chunk;
  }
});

const promptElement = (prompt) => {
  const container = document.createElement("div");
  container.classList.add("flex", "items-start", "justify-end");
  const content = document.createElement("div");
  content.classList.add(
    "bg-blue-500",
    "text-white",
    "rounded-lg",
    "px-4",
    "py-2",
    "max-w-xs",
    "shadow",
    "text-sm"
  );
  content.textContent = prompt;
  container.appendChild(content);
  return container;
};

const createResponseElement = () => {
  const container = document.createElement("div");
  container.classList.add("flex", "items-start");
  const contentHolder = document.createElement("div");
  contentHolder.classList.add(
    "bg-gray-300",
    "rounded-lg",
    "px-4",
    "py-2",
    "max-w-xs",
    "shadow",
    "text-sm"
  );

  container.appendChild(contentHolder);

  return {
    container,
    contentHolder,
  };
};
