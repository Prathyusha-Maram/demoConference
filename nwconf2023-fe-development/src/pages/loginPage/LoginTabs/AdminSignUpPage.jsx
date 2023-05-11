import React, { useState } from "react";
import axios from "axios";
import { API_ENDPOINT } from "../../../constant/constant";
import { NavLink } from "react-router-dom";

const AdminSignUpPage = () => {
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

  function AdminSignup() {

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
        .post(`${API_ENDPOINT}/admin/signup`, {
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
    <div className="login-container">
      <div className="login-con" style={{ margin: "40px 0" }}>
        <h2 style={{textAlign:"center"}}>Chariman Register</h2>
        <div className="login-input-con new">
		    <form onSubmit={AdminSignup}style={{ display:"flex", flexDirection:"column" }}>
          <div className="nameContainer" style={{ display: 'flex', width:"700px" }}>
          <div style={{flex: 1}}>
          <label htmlFor="firstName">First Name</label>
          <input
            type="text" className={`form-control ${firstNameError ? 'is-invalid' : ''}`} id="firstName"
            placeholder="First Name"
            onChange={(e) => setFirstName(e.target.value)}
            style={{ border: '1px solid #ccc', borderRadius: '4px', padding: '5px' , width: "100%" }}
          />
          {firstNameError && <div className="invalid-feedback">{firstNameError}</div>}
          </div>
          <div style={{ marginLeft: "20px", flex:1 }}>
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text" className={`form-control ${lastNameError ? 'is-invalid' : ''}`} id="lastName"
            placeholder="Last Name"
            onChange={(e) => setLastName(e.target.value)}
            style={{ border: '1px solid #ccc', borderRadius: '4px', padding: '5px' , width: "100%" }}
          />
          {lastNameError && <div className="invalid-feedback">{lastNameError}</div>}
          </div>
          </div>
          <div className="emailContainer" style={{ display: "flex", width:"700px"}}>
          <div style={{flex: 1}}>
          <label htmlFor="email">Email Address</label>
          <input
            type="email" className={`form-control ${emailError ? 'is-invalid' : ''}`} id="email"
            placeholder="Email"
            onChange={(e) => setSignUpReviewerEmail(e.target.value)}
            style={{ border: '1px solid #ccc', borderRadius: '4px', padding: '5px' , width: "100%" }}
          />
          {emailError && <div className="invalid-feedback">{emailError}</div>}
          </div>
          <div style={{ marginLeft: "20px", flex:1 }}>
          <label htmlFor="confirmEmail">Confirm Email Address</label>
          <input
            type="email" className={`form-control ${confirmEmailError ? 'is-invalid' : ''}`} id="confirmEmail"
            placeholder="Confirm Email"
            onChange={(e) => setConfirmSignUpReviewerEmail(e.target.value)}
            style={{ border: '1px solid #ccc', borderRadius: '4px', padding: '5px' , width: "100%" }}
          />
          {confirmEmailError && <div className="invalid-feedback">{confirmEmailError}</div>}
          </div>
          </div>
          <div className="emailContainer" style={{ display: "flex", width:"700px"}}>
          <div style={{flex: 1}}>
          <label htmlFor="password">Passowrd</label>
          <input
            type="password" className={`form-control ${passwordError ? 'is-invalid' : ''}`} id="password"
            placeholder="Password"
            onChange={(e) => setSignUpReviewerPassword(e.target.value)}
            style={{ border: '1px solid #ccc', borderRadius: '4px', padding: '5px' , width: "100%" }}
          />
          {passwordError && <div className="invalid-feedback">{passwordError}</div>}
          </div>
          <div style={{ marginLeft: "20px", flex:1 }}>
          <label htmlFor="confrimPassword">Confirm Passowrd</label>
          <input
            type="password" className={`form-control ${confirmPasswordError ? 'is-invalid' : ''}`} id="confirmpassword"
            placeholder="Confirm Password"
            onChange={(e) => setConfirmSignUpReviewerPassword(e.target.value)}
            style={{ border: '1px solid #ccc', borderRadius: '4px', padding: '5px' , width: "100%" }}
          />
          {confirmPasswordError && <div className="invalid-feedback">{confirmPasswordError}</div>}
          </div>
          </div>
          <label htmlFor="areaOfIntrest">Area Of Intrest</label>
          <input
            type="text" className={`form-control ${interestsError ? 'is-invalid' : ''}`} id="interests"
            placeholder="Area Of Intrest"
            onChange={(e) => setAreaOfInterest(e.target.value)}
            style={{ border: '1px solid #ccc', borderRadius: '4px', padding: '5px' , width: "100%" }}
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
          <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button onClick={AdminSignup}>Sign UP</button>
		  </div>
          </form>
          <p> Already have an account? <NavLink to="/admin/login">Login Here</NavLink> </p>
        </div>
      </div>
    </div>
  );
};

export default AdminSignUpPage;
