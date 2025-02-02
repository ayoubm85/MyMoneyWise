import { useState, useEffect } from "react";
import "../styles/Chatbot.css"; 
import "../styles/Global.css"

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { 
      sender: "bot", 
      text: "Hello! I'm your financial advisor. I can analyze your budget and provide personalized recommendations. Would you like me to analyze your financial situation?"
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const analyzeBudget = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) {
        setError("Please login first");
        return;
      }

      setLoading(true);
      const response = await fetch("http://localhost:5000/api/budget/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user._id
        }),
      });

      const data = await response.json();

      if (response.ok) {
        const newMessages = [
          { sender: "bot", text: `Summary: ${data.summary}` },
          { 
            sender: "bot", 
            text: "Key Insights:\n" + data.insights.map(insight => `• ${insight}`).join("\n")
          },
          {
            sender: "bot",
            text: "Recommendations:\n" + data.recommendations.map(rec => `• ${rec}`).join("\n")
          },
          {
            sender: "bot",
            text: "Financial Advice:\n" + data.financial_advice.map(advice => `• ${advice}`).join("\n")
          }
        ];
        setMessages(prev => [...prev, ...newMessages]);
      } else {
        setError(data.error || "Failed to get analysis");
        setMessages(prev => [...prev, { sender: "bot", text: "Sorry, I couldn't analyze your budget at this time." }]);
      }
    } catch (err) {
      setError("Server error. Please try again later.");
      setMessages(prev => [...prev, { sender: "bot", text: "Sorry, I encountered an error. Please try again later." }]);
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (input.trim() === "") return;

    const userMessage = { sender: "user", text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");

    if (input.toLowerCase().includes("analyze") || input.toLowerCase().includes("yes")) {
      await analyzeBudget();
    } else {
      setMessages(prev => [...prev, { 
        sender: "bot", 
        text: "I can help you analyze your budget and provide financial recommendations. Just ask me to analyze your situation!" 
      }]);
    }
  };

  return (
    <div className="page-container">
      <div className="chatbot-container">
      <h1 className="chatbot-title">MyMoneyWise AI Advisor</h1>
      {error && <div className="error-message">{error}</div>}
      <div className="chat-window">
        {loading && <div className="loading-message">Analyzing your financial data...</div>}
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
        <button type="submit" className="chat-send-button" disabled={loading}>
          {loading ? "Analyzing..." : "Send"}
        </button>
      </form>
    </div>
    </div>
  );
};

export default Chatbot;
