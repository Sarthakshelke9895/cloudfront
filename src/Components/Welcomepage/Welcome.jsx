import React from 'react'
import './Welcome.css'
import { useNavigate } from 'react-router-dom';

const Welcome = () => {

  const navigate = useNavigate();

  const handleUploadClick = () => {
      // Navigate to the Uploadapp page
      navigate('/register');
  };
  const handleloginclick =()=>{
    navigate('/login')
  }
  return (
    <div class="parentw">
      <div className="heading">
        <h1>Welcome to XanaX </h1>
        <h2>Cloud Platform to Upload your Credentials and access them with ease of access</h2>
        <button class="get-started-btn" onClick={handleUploadClick}>Get Started</button>
        <p>Already registered?<button onClick={handleloginclick} className='loginbutton'>Login</button></p>
     </div>
    </div>
  )
}

export default Welcome
