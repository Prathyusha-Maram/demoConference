import React, { useState } from "react";
import axios from "axios";
import { API_ENDPOINT } from "../../../constant/constant";
import { useNavigate, NavLink } from "react-router-dom";
const ReviewLoginPage = () => {
  const [reviewerloginEmail, setreviewerloginUpEmail] = useState("");
  const [reviewerloginPassword, setreviewerloginPassword] = useState("");
  const [login1alert, setlogin1alert] = useState(false);
  const navigate = useNavigate();

  function Reviewerlogin() {
    axios
      .post(`${API_ENDPOINT}/reviewer/login`, {
        email: reviewerloginEmail,
        password: reviewerloginPassword,
      })
      .then(
        (response) => {
          if (response.data.status === true) {
            localStorage.setItem("Reviewer-email", reviewerloginEmail);
            localStorage.setItem("Reviewertoken", response.data.token);

            navigate("/ReviewerLogin", {
              state: {
                ReviewerEmail: reviewerloginEmail,
              },
            });
          } else {
            setlogin1alert(true);
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
        <h2>Reviewer Login</h2>

        <div className="login-input-con new">
          <input
            type="email"
            placeholder="email"
            onChange={(e) => setreviewerloginUpEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setreviewerloginPassword(e.target.value)}
          />
          <span>
            New User <NavLink to="/committee/register">Sign Up</NavLink>
          </span>
          {login1alert ? (
            <strong style={{ color: "red" }}>Wrong Details</strong>
          ) : (
            ""
          )}
          <button onClick={Reviewerlogin}>Login</button>
        </div>
      </div>
    </div>
  );
};

export default ReviewLoginPage;
