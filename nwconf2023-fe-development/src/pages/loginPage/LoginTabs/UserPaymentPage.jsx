import React, { useState } from "react";
import axios from "axios";
import { API_ENDPOINT } from "../../../constant/constant";
import { useNavigate, NavLink } from "react-router-dom";
import { PayPalButton } from "react-paypal-button-v2"

const GuestLoginPage = () => {
    const navigate = useNavigate()
    const handleSuccessPayment = async (paymentResults) => {
        await axios.post(`${API_ENDPOINT}/payment`, {
            email: paymentResults.payer.email_address, payementStatus: paymentResults.status,
        }).then(
            (response) => {
                console.log(response);
            }
        )
        alert("Payment success. You will be recieving an email regarding the payment.")
    }

    return (
        <div className="login-container" style={{ background: "../images/bg6.png" }}>
            <div className="login-con" style={{ textAlign: "center", marginTop: "40px" }}>
                <h2>Register for Conference</h2>
                <div className="guestContainer" style={{ height: "100%", padding: "4rem 0" }}>
                    <div className="guestLogin" style={{ width: "35rem" }}>
                        <h3 style={{ color: "#006747", marginBottom: "10px" }}>Make your payment</h3>
                        <p>In order to attend this conference and present your paper, you are required to make a payment.</p>
                        <div className="pay" style={{ display: "flex", justifyContent: "center" }}>
                            <h3 style={{ color: "#000", marginBottom: "10px" }}>Amount : </h3>
                            <h3 style={{ color: "#006747", marginBottom: "10px" }}>  $500.00</h3>
                        </div>
                        <p style={{ marginTop: "20px" }}>Payment options</p>
                        <PayPalButton amount={500} onSuccess={(details, data) => handleSuccessPayment(details)} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GuestLoginPage;