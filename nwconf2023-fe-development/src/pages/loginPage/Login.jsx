import React from 'react'
// import { Routes, Route } from "react-router-dom";
// import AdminLogin from "./components/adminLogin"
// import ReviewerLogin from "./components/reviewerLogin"
// import UserLogin from "./components/userLogin"
import Collage from "../../images/clg.jpeg"
import LoginTab from "./LoginTabs/loginTab"

const Login = () => {


  return (
    
    <div>

  


      <div className="login-page-container">
        <div className="login-card">
          <div className="login-img">
            <img src={Collage} alt="" />
          </div>
          <div className="login-content">
            <LoginTab />
          </div>

  
        </div>
      </div>
    </div>
  )
}

export default Login