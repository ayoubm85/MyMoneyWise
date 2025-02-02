import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Header.css";

const Header = ({ totalBudget, totalExpenses }) => {
  const [remainingBudget, setRemainingBudget] = useState(0);
  const navigate = useNavigate(); 

  useEffect(() => {
    setRemainingBudget(totalBudget - totalExpenses);
  }, [totalBudget, totalExpenses]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    navigate("/login");
  };

  return (
    <header className="app-header">
      <div className="header-logo">
        <Link to="/menu">
          <img src="/logo.png" alt="MyMoneyWise Logo" />
        </Link>
      </div>

      <div className="header-summary">
        <span>Total Budget: <strong>${totalBudget.toFixed(2)}</strong></span>
        <span>Total Expenses: <strong>${totalExpenses.toFixed(2)}</strong></span>
        <span>Remaining: <strong className={remainingBudget < 0 ? "negative" : ""}>${remainingBudget.toFixed(2)}</strong></span>
      </div>

      <div className="header-auth">
        <button onClick={handleLogout}>Logout</button>
      </div>
    </header>
  );
};

export default Header;

