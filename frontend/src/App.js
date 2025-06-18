import React, { useState } from 'react';
import ChatBox from './ChatBox';

const App = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { sender: 'user', text: input }];
    setMessages(newMessages);
    setInput('');

    try {
      const res = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessages([...newMessages, { sender: 'bot', text: data.response }]);
      } else {
        setMessages([...newMessages, { sender: 'bot', text: 'Error: ' + data.error }]);
      }
    } catch (err) {
      setMessages([...newMessages, { sender: 'bot', text: 'Server error. Please try again later.' }]);
    }
  };

  return (
    <div className="app">
      <h1>AI Chatbot Assistant</h1>
      <ChatBox messages={messages} />
      <div className="input-area">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default App;
