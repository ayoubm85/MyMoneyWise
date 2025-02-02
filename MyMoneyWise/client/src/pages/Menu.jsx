import { useNavigate } from "react-router-dom";
import "../styles/Menu.css";
import "../styles/Global.css"; 

const MainMenu = () => {
  const navigate = useNavigate();

  const menuItems = [
    { title: "Financial Profile", path: "/profile", icon: "👤" },
    { title: "Add Expenses", path: "/expenses", icon: "💸" },
    { title: "Create Budget", path: "/budget", icon: "📊" },
    { title: "Chat with AI", path: "/chatbot", icon: "💬" },
  ];

  return (
    <div className="menu-page">
      <h1 className="menu-title">MyMoneyWise</h1>
      <div className="menu-grid">
        {menuItems.map((item, index) => (
          <div key={index} className="menu-card" onClick={() => navigate(item.path)}>
            <span className="menu-icon">{item.icon}</span>
            <h2>{item.title}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainMenu;
