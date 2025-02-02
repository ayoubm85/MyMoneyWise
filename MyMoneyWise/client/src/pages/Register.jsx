import { useState } from 'react';
import '../styles/Register.css'; 
import "../styles/Global.css"; 

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
        <h1>Create Your Account</h1>
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
              <input
                type="text"
                id="lastName"
                name="lastName"
                placeholder='Last Name'
                value={formData.lastName}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                id="email"
                name="email"
                placeholder='Mail'
                value={formData.email}
                onChange={handleChange}
                required
              />
              <input
                type="password"
                id="password"
                name="password"
                placeholder='Password'
                value={formData.password}
                onChange={handleChange}
                required
              />
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
  );
};

export default Register;