import { useState, useEffect } from "react";
import "../styles/Budget.css";
import "../styles/Global.css"; 

const Budget = ({ onBudgetUpdated }) => { 
  const [budgetData, setBudgetData] = useState({
    rent: "",
    groceries: "",
    transport: "",
    savings: "",
    entertainment: "",
    others: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [existingBudget, setExistingBudget] = useState(null);

  useEffect(() => {
    fetchExistingBudget();
  }, []);

  const fetchExistingBudget = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) {
        setError("Please login first");
        return;
      }

      const response = await fetch(`http://localhost:5000/api/budget/${user._id}`);
      const data = await response.json();

      if (response.ok && data.categories) {
        setExistingBudget(data);

        const formData = {};
        data.categories.forEach(({ category, allocatedAmount }) => {
          formData[category.toLowerCase()] = allocatedAmount; 
        });

        setBudgetData(formData);
      }
    } catch (err) {
      console.error("Error fetching budget:", err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBudgetData({ ...budgetData, [name]: value });
  };

  const calculateTotal = () => {
    return Object.values(budgetData).reduce((sum, val) => sum + (parseFloat(val) || 0), 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) {
        setError("Please login first");
        return;
      }

      const categories = Object.entries(budgetData).map(([category, allocatedAmount]) => ({
        category: category.charAt(0).toUpperCase() + category.slice(1),
        allocatedAmount: parseFloat(allocatedAmount)
      }));

      const totalBudget = calculateTotal();

      const method = existingBudget ? "PUT" : "POST";
      const url = existingBudget
        ? `http://localhost:5000/api/budget/${user._id}`
        : "http://localhost:5000/api/budget";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user._id,
          totalBudget,
          categories,
          timePeriod: "monthly"
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess("Budget saved successfully!");
        setExistingBudget(data);
        onBudgetUpdated(); 
      } else {
        setError(data.message || "Failed to save budget");
      }
    } catch (err) {
      setError("Server error. Please try again later.");
    }
  };

  return (
    <div className="page-container">
      <div className="budget-page">
        <h1 className="budget-title">Manage Your Budget</h1>

        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

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

            <div className="total-budget">
              <h2>Total Budget: <span>${calculateTotal().toFixed(2)}</span></h2>
            </div>

            <button type="submit" className="submit-button">
              {existingBudget ? "Update Budget" : "Save Budget"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Budget;
