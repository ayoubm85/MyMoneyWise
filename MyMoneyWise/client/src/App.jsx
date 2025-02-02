import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx"
import Chatbot from "./pages/Chatbot.jsx"
import Expenses from "./pages/Expenses.jsx"
import Budget from "./pages/Budget.jsx"
import Profile from "./pages/Profile.jsx"
import Menu from "./pages/Menu.jsx";
import Header from "./components/header.jsx";
import "./components/Header.css";


function App() {

  return (
    <div className = "app-container">
      <Header 
        totalBudget={1500}
        totalExpenses={700}
        handleLogout={() => console.log("logout")}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/expenses" element={<Expenses />} />
        <Route path="/budget" element={<Budget />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/menu" element={<Menu />} />
      </Routes>
    </div>
  )
}

export default App
