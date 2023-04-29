import React, { useState } from "react";
import Profile from "../../../images/profileImage.jpg";
import SubmitNew from "../../../images/newPaper.png";
import PaperStatus from "../../../images/editPaper.png";
import KmowMore from "../../../images/knowMore.jpg";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_ENDPOINT } from "../../../constant/constant";
import { useEffect } from "react";
const UserLoginPageTab = () => {
  const [userDatas, setUserDatas] = useState();
  const [disabled, setDisabled] = useState(true);
  const navigate = useNavigate();
  const [myheader] = useState({
    headers: {
      token: localStorage.getItem("Usertoken"),
    },
  });
  const GetApi = () => {
    axios.get(`${API_ENDPOINT}/my/project`, myheader).then((response) => {
      setUserDatas(response.data.project);
      setDisabled(false);
    });
  };

  useEffect(() => {
    GetApi();
  }, []);

  function checkStatus() {
    navigate("/checkStatus", { state: userDatas });
  }

  return (
    <div>
      <div className="user-pag-con">
        <div className="profile-container">
          <div className="profile-img">
            <img src={Profile} alt="" />
          </div>
          <div className="user-details">
            <p>
              User Name :<b>{userDatas?.userName}</b>
            </p>
            <p>
              User Email :<b>{userDatas?.email}</b>
            </p>

            <button className="edit-profile-btn">Edit Profile</button>
          </div>
        </div>
        <NavLink to="/evaluate">
          <div className="submit-new">
            <div className="sub-img">
              <img src={SubmitNew} alt="" />
            </div>
            <p>Assign & Evaluate</p>
          </div>
        </NavLink>
        <button style={{ border: "none" }} disabled={disabled}>
          <div className="submit-new" onClick={checkStatus}>
            <div className="sub-img">
              <img src={PaperStatus} alt="" />
            </div>
            <p>Discussion</p>
          </div>
        </button>
      </div>
    </div>
  );
};

export default UserLoginPageTab;
