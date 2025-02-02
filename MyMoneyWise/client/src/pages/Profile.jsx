import { useState } from "react";
import "../styles/Profile.css";
import "../styles/Global.css"; 

const FinancialProfile = () => {
  const [profile, setProfile] = useState({
    age: "",
    employmentStatus: "",
    income: "",
    financialGoal: "",
    notes: "",
  });

  const employmentOptions = ["Employed", "Unemployed", "Self-employed", "Student", "Retired"];
  const financialGoals = ["Save Money", "Invest", "Reduce Debt", "Plan for Retirement"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Profile Saved:", profile);
  };

  return (
    <div className="page-container">
      <div className="profile-page">
      <h1 className="profile-title">Financial Profile</h1>
      
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
            name="income"
            placeholder="Enter your income"
            value={profile.income}
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
            name="notes"
            placeholder="Any additional information"
            value={profile.notes}
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
