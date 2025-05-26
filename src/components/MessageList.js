import React, { useEffect, useRef } from 'react';

const MessageList = ({ user, messages }) => {
  const bottomRef = useRef();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="message-list">
      {messages.map((msg, index) => {
        const isMine = msg.sender === user;
        return (
          <div key={index} className={`message-bubble ${isMine ? 'sent' : 'received'}`}>
            {!isMine && <div className="sender">{msg.sender}</div>}
            <div className="text">{msg.text}</div>
          </div>
        );
      })}
      <div ref={bottomRef} />
    </div>
  );
};

export default MessageList;
