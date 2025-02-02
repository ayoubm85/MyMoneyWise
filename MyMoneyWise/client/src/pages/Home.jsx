import { useNavigate } from "react-router-dom";
import "../styles/Global.css"; 
import "../styles/Home.css"

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h1 className="site-title">MyMoneyWise</h1>
      <p className="home-tagline">
          Take control of your wealth with your personal AI financial assistant.
      </p>
      <button className="home-button-login" onClick={() => navigate("/login")}>
        Login
      </button>
      <button className="home-button-register" onClick={() => navigate("/register")}>
        Register
      </button>
    </div>
  );
};

export default Home;