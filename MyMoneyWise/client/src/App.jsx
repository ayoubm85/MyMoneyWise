import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Chatbot from "./pages/Chatbot.jsx";
import Expenses from "./pages/Expenses.jsx";
import Budget from "./pages/Budget.jsx";
import Profile from "./pages/Profile.jsx";
import Menu from "./pages/Menu.jsx";
import Header from "./components/Header.jsx";
import "./components/Header.css";

function App() {
  const [totalBudget, setTotalBudget] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [updateTrigger, setUpdateTrigger] = useState(0); 
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return;

    const fetchBudgetAndExpenses = async () => {
      try {
        const budgetRes = await fetch(`http://localhost:5000/api/budget/${user._id}`);
        if (budgetRes.ok) {
          const budgetData = await budgetRes.json();
          setTotalBudget(budgetData.totalBudget || 0);
        }

        const expensesRes = await fetch(`http://localhost:5000/api/cashFlow/${user._id}`);
        if (expensesRes.ok) {
          const expensesData = await expensesRes.json();
          const totalExpensesAmount = expensesData.reduce((sum, expense) => sum + expense.amount, 0);
          setTotalExpenses(totalExpensesAmount);
        }
      } catch (error) {
        console.error("❌ Error fetching budget or expenses:", error);
      }
    };

    fetchBudgetAndExpenses();
  }, [updateTrigger]); 

  return (
    <div className="app-container">
      <Header 
        totalBudget={totalBudget}
        totalExpenses={totalExpenses}
        handleLogout={() => {
          localStorage.removeItem("user");
          window.location.reload();
        }}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/expenses" element={<Expenses onExpenseAdded={() => setUpdateTrigger(prev => prev + 1)} />} />
        <Route path="/budget" element={<Budget onBudgetUpdated={() => setUpdateTrigger(prev => prev + 1)} />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/menu" element={<Menu />} />
      </Routes>
    </div>
  );
}

export default App;
