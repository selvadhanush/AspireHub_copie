// /client/src/pages/Forum.jsx

import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

// Connect to the backend Socket.IO server
const socket = io('http://localhost:8000'); // Adjust if using a different port

function Forum() {
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState('');
  const [text, setText] = useState('');

  useEffect(() => {
    // Fetch old messages from MongoDB
    fetch('http://localhost:8000/api/forum/messages')
      .then((res) => res.json())
      .then((data) => setMessages(data))
      .catch((err) => console.error('Failed to fetch messages:', err));

    // Listen for real-time new messages
    socket.on('receive_message', (data) => {
      setMessages((prev) => [...prev, data]);
    });

    // Cleanup on unmount
    return () => {
      socket.off('receive_message');
    };
  }, []);

  const handleSend = (e) => {
    e.preventDefault();
    if (!username || !text) return;

    const message = {
      username,
      text,
      timestamp: new Date().toISOString(),
    };

    socket.emit('send_message', message);
    setText('');
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Community Forum</h2>

      <form onSubmit={handleSend} className="mb-4">
        <input
          type="text"
          placeholder="Your name"
          className="border p-2 mr-2"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="text"
          placeholder="Type your message..."
          className="border p-2 mr-2 w-1/2"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded" type="submit">
          Send
        </button>
      </form>

      <ul className="space-y-2">
        {messages.map((msg, idx) => (
          <li key={idx} className="border p-2 rounded">
            <span className="font-semibold">{msg.username}:</span> {msg.text}
            <div className="text-xs text-gray-500">{new Date(msg.timestamp).toLocaleString()}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Forum;
