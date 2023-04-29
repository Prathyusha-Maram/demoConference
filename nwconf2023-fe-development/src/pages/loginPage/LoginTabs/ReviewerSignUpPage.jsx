import React, { useState } from "react";
import axios from "axios";
import { API_ENDPOINT } from "../../../constant/constant";
import { NavLink } from "react-router-dom";

const ReviewerSignUpPage = () => {
  const [signUpReviewerUserName, setSignUpReviewerUserName] = useState("");
  const [signupReviewerEmail, setSignUpReviewerEmail] = useState("");
  const [signUpReviewerPassword, setSignUpReviewerPassword] = useState("");

  const [reivewerSignUpTost, setReviewerSignUptoast] = useState(false);
  const [reivewerSignUpTost1, setReviewerSignUptoast1] = useState(false);

  function ReviewverSignup() {
    axios
      .post(`${API_ENDPOINT}/reviewer/signup`, {
        userName: signUpReviewerUserName,
        password: signUpReviewerPassword,
        email: signupReviewerEmail,
        confirmPassword: signUpReviewerPassword,
      })
      .then(
        (response) => {
          if (response.data.status === true) {
            setReviewerSignUptoast(true);
          } else {
            setReviewerSignUptoast1(true);
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

        <div className="login-input-con new">
          <input
            type="text"
            placeholder="User Name"
            onChange={(e) => setSignUpReviewerUserName(e.target.value)}
          />
          <input
            type="email"
            placeholder="email"
            onChange={(e) => setSignUpReviewerEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setSignUpReviewerPassword(e.target.value)}
          />
          {reivewerSignUpTost ? (
            <strong style={{ color: "green" }}>Sign up Sucessfull</strong>
          ) : (
            ""
          )}
          {reivewerSignUpTost1 ? (
            <strong style={{ color: "red" }}>SignUP not Sucessfull</strong>
          ) : (
            ""
          )}
          <p>
            Already a reviewer{" "}
            <NavLink to="/committee/login">Login Here</NavLink>
          </p>
          <button onClick={ReviewverSignup}>Sign UP</button>
        </div>
      </div>
    </div>
  );
};

export default ReviewerSignUpPage;
