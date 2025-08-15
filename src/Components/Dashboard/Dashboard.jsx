import React from 'react'
import "./Dashboard.css"
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import Sidebar from '../Sidebar/Sidebar'

const Dashboard = () => {
  return (
    <div className="content">
    <Navbar/>
    <Sidebar/>
      <Footer/>
    </div>
  )
}

export default Dashboard
