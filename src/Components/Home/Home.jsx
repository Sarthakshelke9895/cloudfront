import React from 'react'
import './Home.css'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import Welcome from '../Welcomepage/Welcome'

const Home = () => {
  return (
    <div>
      <Navbar/>
       <Welcome/>
      <Footer/>
    </div>
  )
}

export default Home
