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
          <table>
            <tr>
              <td className='InfoHeading'>Name</td>
              <td>&nbsp;:&nbsp; </td>
              <td>&nbsp;{userDatas?.userName}</td>
            </tr>
            <tr>
              <td className='InfoHeading'>Email</td>
              <td>&nbsp;:&nbsp;</td>
              <td>{userDatas?.email}</td>
            </tr>
            <tr>
              <td className='InfoHeading'>Mobile Number</td>
              <td>&nbsp;:&nbsp;</td>
              <td>6605213456</td>
            </tr>
            <tr>
              <td className='InfoHeading'>Country</td>
              <td>&nbsp;:&nbsp;</td>
              <td>India</td>
            </tr>
            <tr>
              <td className='InfoHeading'>Date of birth</td>
              <td>&nbsp;:&nbsp;</td>
              <td>06 June 1999</td>
            </tr>
            <tr>
              <td className='InfoHeading'>Areas of intrest</td>
              <td>&nbsp;:&nbsp;</td>
              <td>Software engineering, Cloud computing, Block chain</td>
            </tr>
          </table>
            {/* <p>
              User Name :<b>{userDatas?.userName}</b>
            </p>
            <p>
              User Email :<b>{userDatas?.email}</b>
            </p> */}

            <button className="edit-profile-btn">Edit Profile</button>
          </div>
        </div>
        <div className="optionContainer">
        <NavLink to="/createPost">
          <div className="submit-new">
            <div className="sub-img">
              <img src={SubmitNew} alt="" />
            </div>
            <p>Submit a New Paper</p>
          </div>
        </NavLink>

        <div className="submit-new">
          <div className="sub-img">
            <img src={KmowMore} alt="" />
          </div>
          <p>Know More About Paper Submission</p>
        </div>
        </div>
      </div>
    </div>
  );
};

export default UserLoginPageTab;
