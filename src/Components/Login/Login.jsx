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
  
   const handleLogin = async () => {
  const mpinValue = mpinArray.join("");

  if (mpinValue.length !== 4) {
    alert("Please enter a 4-digit MPIN");
    return;
  }

  try {
    const res = await fetch("https://cloud-bflt.onrender.com/api/login-mpin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        phoneOrEmail,
        mpin: mpinValue
      }),
    });

    const data = await res.json();

    if (!data.success) {
      alert("Invalid credentials");
      return;
    }

    // ✅ Store JWT token
    localStorage.setItem("token", data.token);

    // Optional: store user info
    localStorage.setItem("user", JSON.stringify(data.user));

    alert("Login Successful");

    navigate("/files");
  } catch (err) {
    console.error(err);
    alert("Something went wrong");
  }
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
