import React from 'react';
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './Components/Home/Home';
import Hero from './Components/Hero/Hero';
import Register from './Components/Register/Register';
import Dashboard from './Components/Dashboard/Dashboard';
import Setup from './Components/SetupMpin/Setup';
import Login from './Components/Login/Login';
import Notes from './Components/Notes/Notes';

function App() {
  
  return (
    <Router>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/files" element={<Hero/>} />
      <Route path="/register" element={<Register/>} />
      <Route path="/dashboard" element={<Dashboard/>} />
      <Route path="/setup" element={<Setup/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/notes" element={<Notes/>} />

      
    </Routes>
  </Router>
  );
}

export default App;
