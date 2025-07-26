import React, { useState } from 'react';
import ChatBox from './ChatBox';

const App = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    if (!input.trim()) return;


    //messegs const
    const newMessages = [...messages, { sender: 'user', text: input }];
    setMessages(newMessages);
    setInput('');

    const res = await fetch('http://localhost:5000/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: input }),
    });

    const data = await res.json();
    setMessages([...newMessages, { sender: 'bot', text: data.reply }]);
  };

  return (
    <div className="container">
      <aside className="sidebar">
        <h2>🤖 MindMate</h2>
        <ul>
          <li>New Chat</li>
          <li>Saved</li>
          <li>Settings</li>
        </ul>
      </aside>
      <main className="main">
        <header><h1>GPT-MindMate</h1></header>
        <ChatBox messages={messages} />
        <div className="input-area">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Type your message..."
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </main>
    </div>
  );
};

export default App;
