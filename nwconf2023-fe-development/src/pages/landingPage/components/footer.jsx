import React from 'react'
import { Outlet } from 'react-router-dom'
import logo from "../../../images/logo.jpg"
import bfb from "../../../images/fb-b-new.png"
import blinkdin from "../../../images/linkdin-black.png"
import bmessage from "../../../images/message-balck.png"
import youtube from "../../../images/youtube-black.png"
import insta from "../../../images/insta-black.png"
const footer = () => {
  return (
    <div>
      <div className="footer-conatiner">

      <div className="f-first-card">
                <img src={logo} alt="logo" className="logo"/>
                <h5 className="title">Northwest Missouri State University</h5>
                <p className="address">800 University Drive</p>
                <p className="address">Maryville, MO 64468 USA</p>
                <p className="address">
                660.562.1212 </p>
          {/* <div className="footer-social-icons">
            <img src={bfb} alt="" />
            <img src={blinkdin} alt="" />
            <img src={bmessage} alt="" />
            <img src={youtube} alt="" />
            <img src={insta} alt="" />
          </div> */}
        </div>
        <div className="f-second-card">
          <h2>USEFUL LINKS</h2>
          <ul className='list-style'>
          <li className='li-style'>Home</li>
          <li className='li-style'>About us</li>
          <li className='li-style'>Services</li>
          <li className='li-style'>Termes of services</li>
          <li className='li-style'>Privacy Policy</li>
          </ul>
          <button className='footer-reportbutton'>Report an Incident</button>
        </div>
        {/* <div className="f-second-card">
          <h2>USEFUL LINKS</h2>
          <ul className='list-style'>
          <li className='li-style'>Home</li>
          <li className='li-style'>About us</li>
          <li className='li-style'>Services</li>
          <li className='li-style'>Termes of services</li>
          <li className='li-style'>Privacy Policy</li>
          </ul>
        </div> */}
        <div className="f-second-card">
          <h2>USEFUL LINKS</h2>
          <ul className='list-style'>
          <li className='li-style'>Home</li>
          <li className='li-style'>About us</li>
          <li className='li-style'>Services</li>
          <li className='li-style'>Termes of services</li>
          <li className='li-style'>Privacy Policy</li>
          </ul>
        </div>
      </div>
      <Outlet />
    </div>
  )
}

export default footer