import React, { useState } from "react";
import axios from "axios";
import { API_ENDPOINT } from "../../../constant/constant";
import { useNavigate, NavLink } from "react-router-dom";
import { PayPalButton } from "react-paypal-button-v2"

const GuestLoginPage = () => {
    const navigate = useNavigate()
    const handleSuccessPayment = async (paymentResults) => {
        await axios.post(`${API_ENDPOINT}/guest/signup`, {
            "id": paymentResults.id, "Email": paymentResults.payer.email_address, "FirstName": paymentResults.payer.name.given_name,
            "LastName": paymentResults.payer.name.surname, "Phone": paymentResults.payer.phone.phone_number.national_number, "Attendance": false
            , "Amount": paymentResults.purchase_units[0].amount.value, "Address": paymentResults.purchase_units[0].shipping.address.address_line_1, "City": paymentResults.purchase_units[0].shipping.address.admin_area_2, "Status": paymentResults.status
        })
        alert("Payment success. You will be recieving an email regarding the payment.")
    }

    return (
        <div className="login-container" style={{background:"../images/bg6.png"}}>
            <div className="login-con" style={{textAlign:"center", marginTop:"40px"}}>
                <h2 >Guest Login</h2>
                <div className="guestContainer" style={{ height: "100%", padding: "4rem 0"}}>
                    <div className="guestLogin" style={{ width: "35rem" }}>
                        <h3 style={{ color: "#006747", marginBottom: "10px" }}>Make your payment</h3>
                        <p>In order to attend this conference, you are required to make a payment in order to recieve your pass on entering the conference</p>
                        <div className="pay" style={{ display: "flex", justifyContent: "center" }}>
                            <h3 style={{ color: "#000", marginBottom: "10px" }}>Amount : </h3>
                            <h3 style={{ color: "#006747", marginBottom: "10px" }}>  $50.00</h3>
                        </div>
                        <p style={{ marginTop: "20px" }}>Payment options</p>
                        <PayPalButton amount={50} onSuccess={(details, data) => handleSuccessPayment(details)} />
                        <div className="pay">
                            <a href="/login" style={{ color: "#006747" }}>Go Back</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GuestLoginPage;