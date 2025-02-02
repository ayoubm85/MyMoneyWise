import { useState } from 'react';
import '../styles/Register.css'; 

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Account Created:', formData);
    }
  }

  return (
    <div className="register-page">
        <h1 className="site-title">My Money Wise</h1> 
        <div className="register-container">
        <h2>Create Your Account</h2>
        <form onSubmit={handleSubmit} className="register-form">
            <div className="input-group">
            <input
                type="text"
                id="firstName"
                name="firstName"
                placeholder='First Name'
                value={formData.firstName}
                onChange={handleChange}
                required
            />
            </div>

            <div className="input-group">
            <input
                type="text"
                id="lastName"
                name="lastName"
                placeholder='Last Name'
                value={formData.lastName}
                onChange={handleChange}
                required
            />
            </div>

            <div className="input-group">
            <input
                type="email"
                id="email"
                name="email"
                placeholder='Mail'
                value={formData.email}
                onChange={handleChange}
                required
            />
            </div>

            <div className="input-group">
            <input
                type="password"
                id="password"
                name="password"
                placeholder='Password'
                value={formData.password}
                onChange={handleChange}
                required
            />
            </div>

            <div className="input-group">
            <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder='Confirm Password'
                value={formData.confirmPassword}
                onChange={handleChange}
                required
            />
            </div>  
            <button type="submit" className="submit-button">Create Account</button>
        </form>
        </div>
    </div>
  );
};

export default Register;