import { useState } from "react";

function App() {
  const [message, setMessage] = useState("");

  async function sendMessage() {
    const response = await fetch("http://localhost:8000/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: message,
      }),
    });

    const data = await response.json();

    console.log(data);
  }

  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>
      <h1>MiniMe</h1>

      <input
        type="text"
        placeholder="Type your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <button
        onClick={sendMessage}
        style={{ marginLeft: "10px" }}
      >
        Send
      </button>
    </div>
  );
}

export default App;