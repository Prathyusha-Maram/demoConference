import React, { useState } from "react";
import axios from "axios";
import { API_ENDPOINT } from "../../../constant/constant";
import { NavLink } from "react-router-dom";

const ReviewerSignUpPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [signupReviewerEmail, setSignUpReviewerEmail] = useState("");
  const [confirmSignupReviewerEmail, setConfirmSignUpReviewerEmail] = useState("");
  const [signUpReviewerPassword, setSignUpReviewerPassword] = useState("");
  const [confirmSignUpReviewerPassword, setConfirmSignUpReviewerPassword] = useState("");
  const [areaOfInterest, setAreaOfInterest] = useState("");
  const [reivewerSignUpTost, setReviewerSignUptoast] = useState(false);
  const [reivewerSignUpTost1, setReviewerSignUptoast1] = useState(false);
  const [interestsError, setInterestsError] = useState('');
  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [confirmEmailError, setConfirmEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  function ReviewverSignup() {

    if (firstName.trim() === '') {
      setFirstNameError('First name is required');
    } else {
      setEmailError('First name is required');
    }

    if (lastName.trim() === '') {
      setLastNameError('Last name is required');
    } else {
      setLastNameError('');
    }

    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!emailRegex.test(signupReviewerEmail)) {
      setEmailError('Email address is invalid');
    } else {
      setEmailError('');
    }

    if (confirmSignupReviewerEmail !== signupReviewerEmail) {
      setConfirmEmailError('Email addresses do not match');
    } else {
      setConfirmEmailError('');
    }

    if (signUpReviewerPassword.length < 6) {
      setPasswordError('Password must be at least 6 characters');
    } else {
      setPasswordError('');
    }

    if (confirmSignUpReviewerPassword !== signUpReviewerPassword) {
      setConfirmPasswordError('Passwords do not match');
    } else {
      setConfirmPasswordError('');
    }

    if (areaOfInterest === "") {
      setInterestsError('Areas of interes is mandatory');
    } else {
      setInterestsError('');
    }

    if (firstName !== "" && lastName !== "" && signupReviewerEmail !== "" && confirmSignupReviewerEmail !== "" && signUpReviewerPassword !== "" && confirmSignUpReviewerPassword !== "") {
      axios
        .post(`${API_ENDPOINT}/reviewer/signup`, {
          firstName: firstName,
          lastName: lastName,
          email: signupReviewerEmail,
          password: signUpReviewerPassword,
          confirmPassword: confirmSignUpReviewerPassword,
          areaOfInterest: areaOfInterest
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
  }
  return (
    <div className="login-page-container">
      <div className="login-con">
        <h2>Committee Register</h2>
        <div className="login-input-con new">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text" className={`form-control ${firstNameError ? 'is-invalid' : ''}`} id="firstName"
            placeholder="First Name"
            onChange={(e) => setFirstName(e.target.value)}
          />
          {firstNameError && <div className="invalid-feedback">{firstNameError}</div>}
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text" className={`form-control ${lastNameError ? 'is-invalid' : ''}`} id="lastName"
            placeholder="Last Name"
            onChange={(e) => setLastName(e.target.value)}
          />
          {lastNameError && <div className="invalid-feedback">{lastNameError}</div>}
          <label htmlFor="email">Email Address</label>
          <input
            type="email" className={`form-control ${emailError ? 'is-invalid' : ''}`} id="email"
            placeholder="Email"
            onChange={(e) => setSignUpReviewerEmail(e.target.value)}
          />
          {emailError && <div className="invalid-feedback">{emailError}</div>}
          <label htmlFor="confirmEmail">Confirm Email Address</label>
          <input
            type="email" className={`form-control ${confirmEmailError ? 'is-invalid' : ''}`} id="confirmEmail"
            placeholder="Confirm Email"
            onChange={(e) => setConfirmSignUpReviewerEmail(e.target.value)}
          />
          {confirmEmailError && <div className="invalid-feedback">{confirmEmailError}</div>}
          <label htmlFor="password">Passowrd</label>
          <input
            type="password" className={`form-control ${passwordError ? 'is-invalid' : ''}`} id="password"
            placeholder="Password"
            onChange={(e) => setSignUpReviewerPassword(e.target.value)}
          />
          {passwordError && <div className="invalid-feedback">{passwordError}</div>}
          <label htmlFor="confrimPassword">Confirm Passowrd</label>
          <input
            type="password" className={`form-control ${confirmPasswordError ? 'is-invalid' : ''}`} id="confirmpassword"
            placeholder="Confirm Password"
            onChange={(e) => setConfirmSignUpReviewerPassword(e.target.value)}
          />
          {confirmPasswordError && <div className="invalid-feedback">{confirmPasswordError}</div>}
          <label htmlFor="areaOfIntrest">Area Of Intrest</label>
          <input
            type="text" className={`form-control ${interestsError ? 'is-invalid' : ''}`} id="interests"
            placeholder="Area Of Intrest"
            onChange={(e) => setAreaOfInterest(e.target.value)}
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
          <button onClick={ReviewverSignup}>Sign UP</button>
          <p> Already have an account? <NavLink to="/committee/login">Login Here</NavLink> </p>
        </div>
      </div>
    </div>
  );
};

export default ReviewerSignUpPage;
