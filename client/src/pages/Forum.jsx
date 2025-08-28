// /client/src/pages/Forum.jsx

import React, { useEffect, useState } from "react";
import io from "socket.io-client";

// Connect to backend server (adjust URL if needed)
const socket = io("http://localhost:8000");

function Forum() {
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState("");
  const [text, setText] = useState("");

  useEffect(() => {
    // Fetch old messages from backend (MongoDB)
    fetch("http://localhost:8000/api/forum/messages")
      .then((res) => res.json())
      .then((data) => setMessages(data))
      .catch((err) => console.error("Failed to fetch messages:", err));

    // Listen for new real-time messages
    socket.on("receive_message", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    // Cleanup listener on unmount
    return () => {
      socket.off("receive_message");
    };
  }, []);

  const handleSend = (e) => {
    e.preventDefault();
    if (!username.trim() || !text.trim()) return;

    const message = {
      username,
      text,
      timestamp: new Date().toISOString(),
    };

    // Emit to server
    socket.emit("send_message", message);

    // Clear input
    setText("");
  };

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">Community Forum</h2>

      {/* Input Form */}
      <form onSubmit={handleSend} className="mb-4 flex gap-2">
        <input
          type="text"
          placeholder="Your name"
          className="border p-2 rounded w-1/4"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="text"
          placeholder="Type your message..."
          className="border p-2 rounded w-1/2"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          type="submit"
        >
          Send
        </button>
      </form>

      {/* Messages */}
      <ul className="space-y-2 max-h-96 overflow-y-auto border p-2 rounded">
        {messages.map((msg, idx) => (
          <li key={idx} className="border p-2 rounded bg-gray-50">
            <span className="font-semibold text-blue-600">{msg.username}:</span>{" "}
            {msg.text}
            <div className="text-xs text-gray-500">
              {new Date(msg.timestamp).toLocaleString()}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Forum;
