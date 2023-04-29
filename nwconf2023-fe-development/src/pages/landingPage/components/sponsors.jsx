import React from 'react'
import Marquee from "react-fast-marquee";
import microsoft from "../../../images/microsoft.png"
import google from "../../../images/google.png"
const sponsors = () => {
    return (
        <div>
            <div className="sponsors">
                <div className="sponsorsInfo">
                    <div className="heading">
                        <h1>OUR SPONSORS</h1>
                    </div>
                </div>
                <div className="sponsorImages" >
                    <Marquee>
                        <img src={microsoft} alt="" />
                        <img src={google} alt="" />
                    </Marquee>
                </div>
            </div>
        </div>
    )
}

export default sponsors