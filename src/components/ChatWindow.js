import React from 'react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';

const ChatWindow = ({ user, messages, onSend }) => {
  return (
    <div className="chat-window">
      <div className="sidebar">
        <h2>{user}</h2>
        <p>You're chatting as {user}</p>
      </div>
      <div className="chat-area">
        <MessageList user={user} messages={messages} />
        <MessageInput onSend={onSend} />
      </div>
    </div>
  );
};

export default ChatWindow;
