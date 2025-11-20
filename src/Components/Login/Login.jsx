import React, { useState } from 'react'
import './Login.css'
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';


const Login = () => {
    const [phoneOrEmail, setPhoneOrEmail] = useState("");
    const [mpinArray, setMpinArray] = useState(["", "", "", ""]);
    const navigate = useNavigate();
  
    const handleChange = (value, index) => {
      if (value.length > 1) return; // limit to 1 digit
      const newMpin = [...mpinArray];
      newMpin[index] = value;
      setMpinArray(newMpin);
  
      // Auto-focus next input
      if (value && index < 3) {
        document.getElementById(`mpin-${index + 1}`).focus();
      }
    };
  
    const handleKeyDown = (e, index) => {
      // Move to previous input on backspace
      if (e.key === "Backspace" && !mpinArray[index] && index > 0) {
        document.getElementById(`mpin-${index - 1}`).focus();
      }
    };
  
    const handleLogin = () => {
      const mpinValue = mpinArray.join(""); 
      console.log(mpinValue)// e.g., "1234"
  
      fetch(`${process.env.REACT_APP_BACKEND}/api/login-mpin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phoneOrEmail, mpin: mpinValue })
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            alert("Login successful:", data);
            navigate('/files')
          } else {
            alert("Invalid credentials");
          }
        })
        .catch((err) => console.error(err));
    };
  return (
    <div className='ParentL'>
        <Navbar/>
        <div className="login-container">
        <h1>Login</h1>
    <input
      type="text"
      placeholder="Phone or Email"
      value={phoneOrEmail}
      onChange={(e) => setPhoneOrEmail(e.target.value)}
    />

    <div className="mpin-container">
      {mpinArray.map((digit, i) => (
        <input
          key={i}
          id={`mpin-${i}`}
          type="password"
          maxLength="1"
          value={digit}
          onChange={(e) => handleChange(e.target.value, i)}
          onKeyDown={(e) => handleKeyDown(e, i)}
          className="mpin-input"
        />
      ))}
        </div>
   
        <button onClick={handleLogin}>Login</button>
    </div>

 <Footer/>
  </div>
    
  )
}

export default Login
