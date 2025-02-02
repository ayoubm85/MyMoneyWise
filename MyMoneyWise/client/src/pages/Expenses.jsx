import { useState, useEffect } from "react";
import "../styles/Expenses.css";
import "../styles/Global.css"; 

const Expenses = ({ onExpenseAdded }) => {
  const [expense, setExpense] = useState({
    amount: "",
    category: "",
    description: "",
  });

  const [expensesList, setExpensesList] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetchExpenses();
  }, []); 

  const fetchExpenses = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) {
        setError("Please login first");
        return;
      }

      const response = await fetch(`http://localhost:5000/api/cashFlow/${user._id}`);
      const data = await response.json();

      if (response.ok) {
        setExpensesList(data);
      }
    } catch (err) {
      console.error("Error fetching expenses:", err);
      setError("Failed to load expenses");
    }
  };

  const categories = ["Food", "Transport", "Entertainment", "Health", "Bills", "Others"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExpense({ ...expense, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!expense.amount || !expense.category) {
      setError("Amount and category are required.");
      return;
    }

    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) {
        setError("Please login first");
        return;
      }

      const response = await fetch("http://localhost:5000/api/cashFlow", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user._id,
          amount: parseFloat(expense.amount),
          category: expense.category,
          description: expense.description || "No description", 
          type: "expense",
          date: new Date().toISOString(),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess("Expense saved successfully!");
        setExpense({ amount: "", category: "", description: "" });
        fetchExpenses(); 
        onExpenseAdded(); 
      } else {
        setError(data.message || "Failed to save expense");
      }
    } catch (err) {
      setError("Server error. Please try again later.");
    }
  };

  const handleDelete = async (expenseId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/cashFlow/${expenseId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setSuccess("Expense deleted successfully!");
        fetchExpenses(); 
        onExpenseAdded(); 
      } else {
        const data = await response.json();
        setError(data.message || "Failed to delete expense");
      }
    } catch (err) {
      setError("Server error. Please try again later.");
    }
  };

  return (
    <div className="page-container">
      <div className="expense-page">
        <h1 className="expense-title">Add an Expense</h1>
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}
        <form onSubmit={handleSubmit} className="expense-form">
          <div className="input-group">
            <input
              type="number"
              name="amount"
              placeholder="Amount ($)"
              value={expense.amount}
              onChange={handleChange}
              required
            />
            <select name="category" value={expense.category} onChange={handleChange} required>
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <input
              type="text"
              name="description"
              placeholder="Description (optional)"
              value={expense.description}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="submit-button">Save Expense</button>
        </form>

        <div className="expense-list">
          <h2>Saved Expenses</h2>
          <ul>
            {expensesList.map((exp) => (
              <li key={exp._id}>
                <span>${exp.amount} - {exp.category}</span>
                {exp.description && <small> ({exp.description})</small>}
                <button 
                  onClick={() => handleDelete(exp._id)}
                  className="delete-button"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Expenses;
