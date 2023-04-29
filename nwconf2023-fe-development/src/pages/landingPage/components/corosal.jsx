import React from 'react'
import headerBox from "../../../images/headerBox.jpg"
import headerBox2 from "../../../images/headerBox2.jpg"
import events from "../../../images/events.jpg"
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.css';
const corosal = () => {
    return (
        <div>        
            <Carousel>
            <Carousel.Item interval={2000}>
                <img
                    className="d-block w-100"
                    height={400}
                    src={headerBox}
                    alt="Image One"
                />
                <Carousel.Caption>
                    <h3>Welcome to NWConf2023</h3>
                    <h6>Submission Deadlines <span style={{ color: "red" }}> August 20, 2023</span></h6>
                    <h6>Conference Dates <span style={{ color: "red" }}> October 12, 2023</span></h6>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item interval={2000}>
                <img
                    className="d-block w-100"
                    height={400}
                    src={events}
                    alt="Image Two"
                />
                <Carousel.Caption>
                    <h3>Register for an event</h3>
                    <p>Click <a href="/Login">here</a> to register</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item interval={2000}>
                <img
                    className="d-block w-100"
                    height={400}
                    src={headerBox2}
                    alt="Image Two"
                />
                <Carousel.Caption>
                    <h3>Check out the deadlines</h3>

                    <p>Click <a href="#">here</a> to know the deadlines</p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel></div>
    )
}

export default corosal