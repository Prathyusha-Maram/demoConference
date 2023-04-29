import React, { useState } from "react";
import axios from "axios";
import { API_ENDPOINT } from "../../../constant/constant";
import { NavLink } from "react-router-dom";
const UserSignUpPage = () => {
  const [signUpUserName, setSignUpUserName] = useState("");
  const [signupEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [userSignUpTost, setuserSignUptoast] = useState(false);
  const [userSignUpTost1, setuserignUptoast1] = useState(false);

  function usersignup() {
    axios
      .post(`${API_ENDPOINT}/signup`, {
        userName: signUpUserName,
        password: signUpPassword,
        email: signupEmail,
        confirmPassword: signUpPassword,
      })
      .then(
        (response) => {
          if (response.data.status === true) {
            setuserSignUptoast(true);
          } else {
            setuserignUptoast1(true);
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }

  return (
    <div className="login-page-container">
      <div className="login-con">
        <h2>Sign UP</h2>

        <div className="login-input-con">
          <input
            type="text"
            placeholder="User-Name"
            onChange={(e) => setSignUpUserName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setSignUpEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setSignUpPassword(e.target.value)}
          />

          {userSignUpTost ? (
            <strong style={{ color: "green" }}>Sign up Sucessfull</strong>
          ) : (
            ""
          )}
          {userSignUpTost1 ? (
            <strong style={{ color: "red" }}>SignUP not Sucessfull</strong>
          ) : (
            ""
          )}
          <p>
            Already a User <NavLink to="/author/login">Login Here</NavLink>
          </p>
          <button onClick={usersignup}>Sign UP</button>
        </div>
      </div>
    </div>
  );
};

export default UserSignUpPage;
