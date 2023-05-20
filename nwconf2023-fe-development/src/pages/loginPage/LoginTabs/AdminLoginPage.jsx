import React, { useState } from "react";
import axios from "axios";
import { API_ENDPOINT } from "../../../constant/constant";
import { useNavigate, NavLink } from "react-router-dom";
const AdminLoginPage = () => {
  const [adminloginEmail, setadminloginUpEmail] = useState("");
  const [adminloginPassword, setadminloginPassword] = useState("");
  const [login2alert, setlogin2alert] = useState(false);
  const navigate = useNavigate();
  function adminLogin() {
    axios
      .post(`${API_ENDPOINT}/admin/login`, {
        email: adminloginEmail,
        password: adminloginPassword,
      })
      .then(
        (response) => {
          console.log(response)
          localStorage.setItem("Admintoken", response.data.token);
          if (response.data.status === true) {
            navigate("/adminLogin", {
              state: {
                name: response.data.clean.firstName + " " + response.data.clean.lastName,
                email: response.data.clean.email,
                areaOfInterest: response.data.clean.areaOfInterest,
              },
            });
          } else {
            setlogin2alert(true);
          }
          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  return (
    <div className="login-page-container">
      <div className="login-con" style={{ textAlign: "center"}}>
        <h2>Chairman Login</h2>

        <div className="login-input-con new">
        <label htmlFor="email">Email Address</label>
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setadminloginUpEmail(e.target.value)}
          />
          <label htmlFor="email">Password</label>
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setadminloginPassword(e.target.value)}
          />

          {login2alert ? (
            <strong style={{ color: "red" }}>Wrong Details</strong>
          ) : (
            ""
          )}
          <button onClick={adminLogin}>Login</button>
          <span>
          Don't have a account? <NavLink to="/admin/register">Register here</NavLink>
          </span>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;
