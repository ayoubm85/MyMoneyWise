import { useState } from "react";
import "../styles/Chatbot.css"; 

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (input.trim() === "") return;

    const userMessage = { sender: "user", text: input };
    const botMessage = { sender: "bot", text: "I'm here to help with your finances!" };

    setMessages([...messages, userMessage, botMessage]);
    setInput("");
  };

  return (
    <div className="chatbot-container">
      <h1 className="chatbot-title">MyMoneyWise</h1>
      <div className="chat-window">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
      </div>
      <form className="chat-input-form" onSubmit={handleSendMessage}>
        <input
          type="text"
          className="chat-input"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit" className="chat-send-button">Send</button>
      </form>
    </div>
  );
};

export default Chatbot;
