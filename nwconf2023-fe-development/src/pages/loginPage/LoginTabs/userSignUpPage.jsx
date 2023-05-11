import React, { useState } from "react";
import axios from "axios";
import { API_ENDPOINT } from "../../../constant/constant";
import { NavLink } from "react-router-dom";
const UserSignUpPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [signupEmail, setSignUpEmail] = useState("");
  const [confrimSignupEmail, setConfrimSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [confirmSignUpPassword, setConfirmSignUpPassword] = useState("");
  const [areaOfInterest, setAreaOfInterest] = useState("");
  const [userSignUpTost, setuserSignUptoast] = useState(false);
  const [userSignUpTost1, setuserignUptoast1] = useState(false);
  const [interestsError, setInterestsError] = useState('');
  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [confirmEmailError, setConfirmEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  function usersignup() {

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
    if (!emailRegex.test(signupEmail)) {
      setEmailError('Email address is invalid');
    } else {
      setEmailError('');
    }

    if (confrimSignupEmail !== signupEmail) {
      setConfirmEmailError('Email addresses do not match');
    } else {
      setConfirmEmailError('');
    }

    if (signUpPassword.length < 6) {
      setPasswordError('Password must be at least 6 characters');
    } else {
      setPasswordError('');
    }

    if (confirmSignUpPassword !== signUpPassword) {
      setConfirmPasswordError('Passwords do not match');
    } else {
      setConfirmPasswordError('');
    }

    if (areaOfInterest === "") {
      setInterestsError('Areas of interes is mandatory');
    } else {
      setInterestsError('');
    }

    if (firstName !== "" && lastName !== "" && signupEmail !== "" && confrimSignupEmail !== "" && signUpPassword !== "" && confirmSignUpPassword !== "") {
      axios
        .post(`${API_ENDPOINT}/signup`, {
          firstName: firstName,
          lastName: lastName,
          email: signupEmail,
          password: signUpPassword,
          confirmPassword: confirmSignUpPassword,
          areaOfInterest: areaOfInterest
        })
        .then(
          (response) => {
            if (response.data.status === true) {
              setuserSignUptoast(true);
            } else {
              setuserignUptoast1(true);
            }
            console.log(response)
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
        <h2 style={{textAlign:"center"}}>Author Registration</h2>
        <div className="login-input-con">
        <form onSubmit={usersignup}style={{ display:"flex", flexDirection:"column" }}>
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
            onChange={(e) => setSignUpEmail(e.target.value)}
			style={{ border: '1px solid #ccc', borderRadius: '4px', padding: '5px' , width: "100%" }}
          />
          {emailError && <div className="invalid-feedback">{emailError}</div>}
          </div>
          <div style={{ marginLeft: "20px", flex:1 }}>
          <label htmlFor="confirmEmail">Confirm Email Address</label>
          <input
            type="email" className={`form-control ${confirmEmailError ? 'is-invalid' : ''}`} id="confirmEmail"
            placeholder="Confirm Email"
            onChange={(e) => setConfrimSignUpEmail(e.target.value)}
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
            onChange={(e) => setSignUpPassword(e.target.value)}
			style={{ border: '1px solid #ccc', borderRadius: '4px', padding: '5px' , width: "100%" }}
          />
          {passwordError && <div className="invalid-feedback">{passwordError}</div>}
          </div>
          <div style={{ marginLeft: "20px", flex:1 }}>
          <label htmlFor="confrimPassword">Confirm Passowrd</label>
          <input
            type="password" className={`form-control ${confirmPasswordError ? 'is-invalid' : ''}`} id="confirmpassword"
            placeholder="Confirm Password"
            onChange={(e) => setConfirmSignUpPassword(e.target.value)}
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
          {interestsError && <div className="invalid-feedback">{interestsError}</div>}
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
          <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button onClick={usersignup}>Sign UP</button>
		  </div>
          </form>
          <p>
            Already have an account? <NavLink to="/author/login">Login Here</NavLink>
          </p>
        </div>
        
      </div>
    </div>
  );
};

export default UserSignUpPage;