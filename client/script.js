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

//login with google using supabase
const SUPABASE_URL = "https://jgwtkpuyrdrfqcrdzvdg.supabase.co";
const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impnd3RrcHV5cmRyZnFjcmR6dmRnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjI0ODgxNDEsImV4cCI6MjAzODA2NDE0MX0.5XyAvO6OOs7lr88Q1b1hAJeqdSedm-_GYG7O2a8ZyPI";

const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

const loginBtn = document.getElementById("google-login");
loginBtn.addEventListener("click", async () => {
  const { user, session, error } = await supabaseClient.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: "http://localhost:3000/redirect",
    },
  });
  console.log(user, session, error);
});

supabaseClient
  .from("Users")
  .select("*")
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.log(error);
  });
