import React, { useEffect, useRef } from 'react';

const ChatBox = ({ messages }) => {
  const chatRef = useRef(null);

  useEffect(() => {
    chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="chat-box" ref={chatRef}>
      {messages.map((msg, i) => (
        <div key={i} className={`message ${msg.sender}`}>
          <div className="bubble">{msg.text}</div>
        </div>
      ))}
    </div>
  );
};

export default ChatBox;


