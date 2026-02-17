const chatBox = document.getElementById("chatBox");
const input = document.getElementById("messageInput");

// Load chat history
window.onload = () => {
  const messages = JSON.parse(localStorage.getItem("chat")) || [];
  messages.forEach(m => addMessage(m.text, m.type, m.time));
};

// Send message
function sendMessage() {
  const text = input.value.trim();
  if (!text) return;

  const time = new Date().toLocaleTimeString();

  addMessage(text, "sent", time);
  saveMessage(text, "sent", time);

  input.value = "";

  // chatbot reply
  setTimeout(botReply, 800);
}

// Add message to chat
function addMessage(text, type, time) {
  const div = document.createElement("div");
  div.className = `message ${type}`;
  div.innerHTML = `
    <div>${text}</div>
    <div class="time">${time}</div>
  `;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// Save to localStorage
function saveMessage(text, type, time) {
  const chat = JSON.parse(localStorage.getItem("chat")) || [];
  chat.push({ text, type, time });
  localStorage.setItem("chat", JSON.stringify(chat));
}

// Simple chatbot
function botReply() {
  const replies = [
    "Hello 👋",
    "How can I help you?",
    "Nice chatting with you 😊",
    "Thanks for your message!"
  ];

  const reply = replies[Math.floor(Math.random() * replies.length)];
  const time = new Date().toLocaleTimeString();

  addMessage(reply, "received", time);
  saveMessage(reply, "received", time);
}
