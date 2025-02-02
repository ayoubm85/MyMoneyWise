import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Header.css"

const Header = ({ totalBudget, totalExpenses, handleLogout }) => {
  const [remainingBudget, setRemainingBudget] = useState(0);

  useEffect(() => {
    setRemainingBudget(totalBudget - totalExpenses);
  }, [totalBudget, totalExpenses]);

  return (
    <header className="app-header">
      {/* Logo */}
      <div className="header-logo">
        <Link to="/menu">
          <img src="/logo.png" alt="MyMoneyWise Logo" />
        </Link>
      </div>

      {/* Résumé Budget */}
      <div className="header-summary">
        <span>Total Budget: <strong>${totalBudget.toFixed(2)}</strong></span>
        <span>Total Expenses: <strong>${totalExpenses.toFixed(2)}</strong></span>
        <span>Remaining: <strong className={remainingBudget < 0 ? "negative" : ""}>${remainingBudget.toFixed(2)}</strong></span>
      </div>

      {/* Déconnexion */}
      <div className="header-auth">
        <button onClick={handleLogout}>Logout</button>
      </div>
    </header>
  );
};

export default Header;
