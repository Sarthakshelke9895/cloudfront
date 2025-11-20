import React, { useRef, useState } from 'react'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import './Setup.css'
import { useLocation, useNavigate} from 'react-router-dom'


const Setup = () => {
  const [values, setValues] = useState(["", "", "", ""]);
  const inputsRef = useRef([]);
  const location = useLocation();
  const navigate = useNavigate();
  const { name, phone, email, password } = location.state || {};

 

 

  const handleChange = (index, value) => {
    // Only allow digits & max length 1
    if (!/^\d?$/.test(value)) return;

    const newValues = [...values];
    newValues[index] = value;
    setValues(newValues);

    // Move to next input if filled
    if (value && index < inputsRef.current.length - 1) {
      inputsRef.current[index + 1].focus();
    }
  
  };


  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !values[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
    if ((e.key === "Enter" || e.key === " ") && index < 3) {
      e.preventDefault();
      inputsRef.current[index + 1].focus();
    

  }
  };
  const handleSetMpin = () => {
    if (values.some((v) => v === "")) {
      alert("Please enter all 4 digits of your MPIN.");
      return;
    }

    const mpinString = values.join("");
    console.log("Saving MPIN:", mpinString, "for phone:", phone);
        const payload = { 
      name, 
      phone, 
      email, 
      password, 
      mpin: mpinString 
    };

    fetch("http://localhost:5000/api/register-full", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ payload})
    })
    
      .then((res) => res.json())
      .then((data) => {
        alert("Registration complete!");
        navigate("/files", { state: { name: data.name } });
      })
      .catch((err) => {
        console.error(err);
        alert("Error saving user");
      });
       console.log("Phone received from registration:", phone);
       console.log("Payload sent to backend:", payload);
  };
  return (
    
    <div className='parentS'>
      <Navbar/>
      <div className="setup-container">
        <h1>Set M-pin to Login</h1>
        <h4>For Phone : +91 {phone}</h4>
        <div className="mpinblock">
      {values.map((val, i) => (
        <input
          key={i}
          type="text"
          className="mpin-block"
          maxLength={1}
          value={val}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          ref={(el) => (inputsRef.current[i] = el)}
        />
      ))}
    </div>
        <button onClick={handleSetMpin}> Set M-Pin</button>
      </div>
      <Footer/>
      
    </div>
  )
}

export default Setup
