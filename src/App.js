import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import ChatWindow from './components/ChatWindow';
import './App.css';

// Connect to backend WebSocket server
const socket = io('https://chat-bot-back-3mrg.onrender.com');

// Assign user identity (A or B) randomly and store in localStorage
const getUsername = () => {
  let user = localStorage.getItem('chat-user');
  if (!user) {
    user = Math.random() > 0.5 ? 'Person A' : 'Person B';
    localStorage.setItem('chat-user', user);
  }
  return user;
};

function App() {
  const [username] = useState(getUsername());
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Listen for messages from server
    socket.on('receive_message', (data) => {
      setMessages((prev) => [...prev, data]);
    });

    // Clean up listener on unmount
    return () => socket.off('receive_message');
  }, []);

  const sendMessage = (text) => {
    const message = { sender: username, text };
    socket.emit('send_message', message); // Only emit, no local push
  };

  return (
    <div className="app">
      <ChatWindow user={username} messages={messages} onSend={sendMessage} />
    </div>
  );
}

export default App;

