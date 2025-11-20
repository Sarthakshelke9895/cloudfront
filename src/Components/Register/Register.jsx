import React, { useState } from "react";
import "./Register.css";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { FaUser, FaPhone, FaEnvelope, FaLock } from "react-icons/fa";
import {useNavigate} from "react-router-dom";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handle =()=>{
    navigate('/login')
  }
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};

    // Username not empty
    if (!form.username.trim()) {
      newErrors.username = "Username cannot be empty";
    }

    // Email must include @gmail.com
    if (!form.email.endsWith("@gmail.com")) {
      newErrors.email = "Email must be a valid Gmail address";
    }

    // Phone number must be 10 digits only
    if (!/^\d{10}$/.test(form.phone)) {
      newErrors.phone = "Phone number must be 10 digits";
    }

    // Password: 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(form.password)) {
      newErrors.password =
        "Password must be 8+ chars with uppercase, lowercase, number, and special char";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
       console.log("User Entered Data:", form);
    
    
      e.preventDefault();
      navigate("/setup", { 
        state: {
          name: form.username, // or form.name if that's your input
          phone: form.phone,
          email: form.email,
          password: form.password
       } 
      });
    



    }
    
 
  };

  localStorage.setItem("user", JSON.stringify({
  name: form.username,
  email: form.email
}));


  return (
    <div className="parentR">
      <Navbar />
      <div className="register-container">
        <h2>Create Account</h2>
        <form className="form" onSubmit={handleSubmit}>
          <div className="input-group">
            <FaUser className="icon" />
            <input
                type="text"
                className="input"
                placeholder="Full Name"
                name="username"
                value={form.username}
                onChange={handleChange}
                required
            />
          </div>
          {errors.username && <p className="error">{errors.username}</p>}

          <div className="input-group">
            <FaEnvelope className="icon" />
            <input
              type="email"
              className="input"
              placeholder="Email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          {errors.email && <p className="error">{errors.email}</p>}

          <div className="input-group">
            <FaPhone id="phone" className="icon" />
            <input
              type="tel"
              className="input"
              placeholder="Phone Number"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              required
            />
          </div>
          {errors.phone && <p className="error">{errors.phone}</p>}

          <div className="input-group">
            <FaLock className="icon" />
            <input
              type={showPassword ? "text" : "password"}
              className="input"
              placeholder="Password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>
          {errors.password && <p className="error">{errors.password}</p>}

          <label className="label">
            <input
              className="checkbox"
              type="checkbox"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
            />
            Show Password
          </label>

          <button >Register</button>
          <div id="loginstatement">Already have an account? <div className="loginbuton" onClick={handle}>Login</div> </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Register;
