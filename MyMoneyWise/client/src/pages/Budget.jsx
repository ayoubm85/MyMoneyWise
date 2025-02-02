import { useState } from "react";
import "../styles/Budget.css";
import "../styles/Global.css"; 

const Budget = () => {
  const [budgetData, setBudgetData] = useState({
    rent: "",
    groceries: "",
    transport: "",
    savings: "",
    entertainment: "",
    others: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBudgetData({ ...budgetData, [name]: value });
  };

  const calculateTotal = () => {
    const values = Object.values(budgetData).map((val) => parseFloat(val) || 0);
    return values.reduce((acc, val) => acc + val, 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Budget Saved:", budgetData);
  };

  return (
    <div className="page-container">
      <div className="budget-page">
      <h1 className="budget-title">Create Your Budget</h1>

      <div className="budget-container">
        <form onSubmit={handleSubmit} className="budget-form">
          <div className="input-group">
            <label htmlFor="rent">Rent / Mortgage</label>
            <input
              type="number"
              id="rent"
              name="rent"
              placeholder="Amount ($)"
              value={budgetData.rent}
              onChange={handleChange}
              className="budget-input"
              required
            />

            <label htmlFor="groceries">Groceries</label>
            <input
              type="number"
              id="groceries"
              name="groceries"
              placeholder="Amount ($)"
              value={budgetData.groceries}
              onChange={handleChange}
              className="budget-input"
              required
            />

            <label htmlFor="transport">Transport</label>
            <input
              type="number"
              id="transport"
              name="transport"
              placeholder="Amount ($)"
              value={budgetData.transport}
              onChange={handleChange}
              className="budget-input"
              required
            />

            <label htmlFor="savings">Savings</label>
            <input
              type="number"
              id="savings"
              name="savings"
              placeholder="Amount ($)"
              value={budgetData.savings}
              onChange={handleChange}
              className="budget-input"
              required
            />

            <label htmlFor="entertainment">Entertainment</label>
            <input
              type="number"
              id="entertainment"
              name="entertainment"
              placeholder="Amount ($)"
              value={budgetData.entertainment}
              onChange={handleChange}
              className="budget-input"
              required
            />

            <label htmlFor="others">Others</label>
            <input
              type="number"
              id="others"
              name="others"
              placeholder="Amount ($)"
              value={budgetData.others}
              onChange={handleChange}
              className="budget-input"
              required
            />
          </div>

          {/* Total Budget */}
          <div className="total-budget">
            <h2>Total Budget: <span>{calculateTotal().toFixed(2)} ($)</span></h2>
          </div>

          <button type="submit" className="submit-button">Save Budget</button>
        </form>
      </div>
    </div>
    </div>
    
  );
};

export default Budget;
