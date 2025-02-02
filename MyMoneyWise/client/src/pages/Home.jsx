import { useNavigate } from "react-router-dom";
import "../styles/Home.css"; 

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h1 className="home-title">MyMoneyWise</h1>
      <button className="home-button login-button" onClick={() => navigate("/login")}>
        Login
      </button>
      <button className="home-button register-button" onClick={() => navigate("/register")}>
        Register
      </button>
    </div>
  );
};

export default Home;