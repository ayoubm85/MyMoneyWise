import { useNavigate } from "react-router-dom";
import "../styles/Global.css";
import "../styles/Login.css";

const Login = () => {
  const navigate = useNavigate();

  return (
    <div className="login-container">
      <h1 className="login-title">Login</h1>
      <form className="login-form">
        <input
          type="email"
          className="login-input"
          placeholder="Email"
        />
        <input
          type="password"
          className="login-input"
          placeholder="Password"
        />
        <button type="submit" className="login-button" onClick={() => navigate("/chatbot")}>Login</button>
      </form>
    </div>
  );
};

export default Login;