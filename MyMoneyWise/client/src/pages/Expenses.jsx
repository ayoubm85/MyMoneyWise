import { useState } from "react";
import "../styles/Expenses.css";
import "../styles/Global.css"; 

const AddExpense = () => {
  const [expense, setExpense] = useState({
    amount: "",
    category: "",
    description: "",
  });

  const [expensesList, setExpensesList] = useState([]);

  const categories = ["Food", "Transport", "Entertainment", "Health", "Bills", "Others"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExpense({ ...expense, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!expense.amount || !expense.category) return;

    const newExpense = { ...expense, id: Date.now() };
    setExpensesList([...expensesList, newExpense]);

    setExpense({ amount: "", category: "", description: "" });

    console.log("Expense Saved:", newExpense);
  };

  return (
    <div className="page-container">
      <div className="expense-page">
      <h1 className="expense-title">Add an Expense</h1>
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
            <li key={exp.id}>
              <span>${exp.amount} - {exp.category}</span>
              {exp.description && <small> ({exp.description})</small>}
            </li>
          ))}
        </ul>
      </div>
    </div>
    </div>
  );
};

export default AddExpense;
