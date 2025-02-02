import { useState, useEffect } from "react";
import "../styles/Profile.css";
import "../styles/Global.css"; 

const FinancialProfile = () => {
  const [profile, setProfile] = useState({
    age: "",
    employmentStatus: "",
    monthlyIncome: "",
    financialGoal: "",
    additionalNotes: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) {
        setError("Please login first");
        return;
      }

      const response = await fetch(`http://localhost:5000/api/financialProfile/${user._id}`);
      const data = await response.json();

      if (response.ok) {
        setProfile({
          age: data.age,
          employmentStatus: data.employmentStatus,
          monthlyIncome: data.monthlyIncome,
          financialGoal: data.financialGoal,
          additionalNotes: data.additionalNotes || "",
        });
        setIsEditing(true);
      }
    } catch (err) {
      console.error("Error fetching profile:", err);
    }
  };

  const employmentOptions = ["Employed", "Unemployed", "Self-employed", "Student", "Retired"];
  const financialGoals = ["Save Money", "Invest", "Reduce Debt", "Plan for Retirement"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
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

      const url = `http://localhost:5000/api/financialProfile${isEditing ? `/${user._id}` : ''}`;
      const method = isEditing ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user._id,
          age: parseInt(profile.age),
          employmentStatus: profile.employmentStatus,
          monthlyIncome: parseFloat(profile.monthlyIncome),
          financialGoal: profile.financialGoal,
          additionalNotes: profile.additionalNotes
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess("Profile saved successfully!");
        setIsEditing(true);
      } else {
        setError(data.message || "Failed to save profile");
      }
    } catch (err) {
      setError("Server error. Please try again later.");
    }
  };

  return (
    <div className="page-container">
      <div className="profile-page">
      <h1 className="profile-title">Financial Profile</h1>
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}
      
      <div className="profile-container">
        <form onSubmit={handleSubmit} className="profile-form">
          <label>Age</label>
          <input
            type="number"
            name="age"
            placeholder="Enter your age"
            value={profile.age}
            onChange={handleChange}
            required
          />

          <label>Employment Status</label>
          <select name="employmentStatus" value={profile.employmentStatus} onChange={handleChange} required>
            <option value="">Select Employment Status</option>
            {employmentOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <label>Monthly Income ($)</label>
          <input
            type="number"
            name="monthlyIncome"
            placeholder="Enter your monthly income"
            value={profile.monthlyIncome}
            onChange={handleChange}
            required
          />

          <label>Financial Goal</label>
          <select name="financialGoal" value={profile.financialGoal} onChange={handleChange} required>
            <option value="">Select Financial Goal</option>
            {financialGoals.map((goal) => (
              <option key={goal} value={goal}>
                {goal}
              </option>
            ))}
          </select>

          <label>Additional Notes</label>
          <textarea
            name="additionalNotes"
            placeholder="Any additional information"
            value={profile.additionalNotes}
            onChange={handleChange}
          />

          <button type="submit" className="submit-button">Save Profile</button>
        </form>
      </div>
    </div>
    </div>
  );
};

export default FinancialProfile;
