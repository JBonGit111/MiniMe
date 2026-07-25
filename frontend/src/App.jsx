import { useState, useRef } from "react";

function App() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const textareaRef = useRef(null);

  async function sendMessage() {
    if (!message.trim()) return;

    const userMessage = {
      role: "User",
      content: message,
    };

    setMessages((currentMessages) => [
      ...currentMessages,
      userMessage,
    ]);
    setMessage("");
    textareaRef.current.style.height = "50px";
    setIsLoading(true);

    const response = await fetch("http://localhost:8000/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: userMessage.content,
      }),
    });

    const data = await response.json();

    const assistantMessage = {
      role: "MiniMe",
      content: data.reply,
    };

    setMessages((currentMessages) => [
      ...currentMessages,
      assistantMessage,
    ]);
    setIsLoading(false);
  }

  return (
    <div
      style={{
        width: "700px",
        height: "700px",
        margin: "40px auto",
        border: "1px solid #ddd",
        borderRadius: "12px",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <h1>MiniMe</h1>

      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "20px",
          borderTop: "1px solid #eee",
          borderBottom: "1px solid #eee",
        }}
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              justifyContent:
                msg.role === "User" ? "flex-end" : "flex-start",
              marginBottom: "12px",
            }}
          >
            <div
              style={{
                backgroundColor:
                  msg.role === "User" ? "#0b93f6" : "#eeeeeeea",
                color: msg.role === "User" ? "white" : "black",
                padding: "12px",
                borderRadius: "18px",
                maxWidth: "70%",
              }}
            >
              {msg.content}
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
           position: "relative",
    padding: "12px",
    borderTop: "1px solid #eee",
        }}
      >
        <textarea
          placeholder="Type your message..."
          value={message}
          ref={textareaRef}
          onChange={(e) => {
            setMessage(e.target.value);

            const textarea = textareaRef.current;
            textarea.style.height = "auto";
            textarea.style.height = textarea.scrollHeight + "px";
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              sendMessage();
            }
          }}
          disabled={isLoading}
          rows={1}
          style={{
            width: "100%",
            padding: "12px 55px 12px 12px",
            fontSize: "16px",
            lineHeight: "1.5",
            resize: "none",
            borderRadius: "10px",
            fontFamily: "inherit",
            overflowY: "auto",
            maxHeight: "25vh",
          }}
        />

        <button
          onClick={sendMessage}
          disabled={isLoading}
          style={{
             position: "absolute",
  right: "24px",
  bottom: "24px",

  width: "38px",
  height: "38px",

  borderRadius: "50%",
  border: "none",

  backgroundColor: "#0b93f6",
  color: "white",

  cursor: isLoading ? "default" : "pointer",
          }}
        >
          {isLoading ? "..." : "↑"}
        </button>
      </div>
    </div>
  );
}

export default App;
