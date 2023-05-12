import React from "react";
// import PropTypes from "prop-types";
// import SwipeableViews from "react-swipeable-views";
// import { makeStyles, useTheme } from "@material-ui/core/styles";
// import AppBar from "@material-ui/core/AppBar";
// import Tabs from "@material-ui/core/Tabs";
// import Tab from "@material-ui/core/Tab";
// import Typography from "@material-ui/core/Typography";
// import Box from "@material-ui/core/Box";
import { NavLink } from "react-router-dom";
// import { API_ENDPOINT } from "../../../constant/constant";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// TabPanel.propTypes = {
//   children: PropTypes.node,
//   index: PropTypes.any.isRequired,
//   value: PropTypes.any.isRequired,
// };

// function a11yProps(index) {
//   return {
//     id: `full-width-tab-${index}`,
//     "aria-controls": `full-width-tabpanel-${index}`,
//   };
// }

// const useStyles = makeStyles((theme) => ({
//   root: {
//     backgroundColor: theme.palette.background.paper,
//     width: 500,
//   },
// }));

export default function FullWidthTabs() {
  // const classes = useStyles();
  // const theme = useTheme();
  // const [value, setValue] = React.useState(0);
  // const [signup, setSignUp] = useState(false);
  // const [ReviewerSignUp, setReviewerSignUp] = useState(false);
  // const [signUpUserName, setSignUpUserName] = useState("");
  // const [signupEmail, setSignUpEmail] = useState("");
  // const [signUpPassword, setSignUpPassword] = useState("");
  // const [signUpReviewerUserName, setSignUpReviewerUserName] = useState("");
  // const [signupReviewerEmail, setSignUpReviewerEmail] = useState("");
  // const [signUpReviewerPassword, setSignUpReviewerPassword] = useState("");
  // const [loginEmail, setloginUpEmail] = useState("");
  // const [loginPassword, setloginPassword] = useState("");
  // const [reviewerloginEmail, setreviewerloginUpEmail] = useState("");
  // const [reviewerloginPassword, setreviewerloginPassword] = useState("");
  // const [adminloginEmail, setadminloginUpEmail] = useState("");
  // const [adminloginPassword, setadminloginPassword] = useState("");
  // const [userSignUpTost, setuserSignUptoast] = useState(false)
  // const [userSignUpTost1, setuserignUptoast1] = useState(false)
  // const [reivewerSignUpTost, setReviewerSignUptoast] = useState(false)
  // const [reivewerSignUpTost1, setReviewerSignUptoast1] = useState(false)
  // const [loginalert , setloginalert] = useState(false)
  // const [login1alert , setlogin1alert] = useState(false)
  // const [login2alert , setlogin2alert] = useState(false)
  // const navigate = useNavigate();

  // const handleChange = (event, newValue) => {
  //   setValue(newValue);
  // };

  // function usersignup() {
  //   axios
  //     .post(`${API_ENDPOINT}/signup`, {
  //       userName: signUpUserName,
  //       password: signUpPassword,
  //       email: signupEmail,
  //       confirmPassword: signUpPassword,
  //     })
  //     .then(
  //       (response) => {
  //         console.log(response, "my responce");
  //         if (response.data.status === true) {
  //           setuserSignUptoast(true)
  //         }
  //         else {
  //           setuserignUptoast1(true)
  //         }
  //       },
  //       (error) => {
  //         console.log(error);
  //       }
  //     );
  // }

  // function ReviewverSignup() {
  //   axios
  //     .post(`${API_ENDPOINT}/reviewer/signup`, {
  //       userName: signUpReviewerUserName,
  //       password: signUpReviewerPassword,
  //       email: signupReviewerEmail,
  //       confirmPassword: signUpReviewerPassword,
  //     })
  //     .then(
  //       (response) => {
  //         console.log(response, "my responce");
  //         if (response.data.status === true) {
  //           setReviewerSignUptoast(true)
  //         } else {
  //           setReviewerSignUptoast1(true)
  //         }
  //       },
  //       (error) => {
  //         console.log(error);
  //       }
  //     );
  // }

  // function userlogin() {
  //   axios
  //     .post(`${API_ENDPOINT}/login`, {
  //       email: loginEmail,
  //       password: loginPassword,
  //     })
  //     .then(
  //       (response) => {
  //         localStorage.setItem("Usertoken", response.data.token);
  //         if (response.data.status === true) {
  //           navigate("/UserLogin");
  //         } else {
  //           console.log("wrong Details");
  //           setloginalert(true)
  //         }
  //       },
  //       (error) => {
  //         console.log(error);
  //       }
  //     );
  // }

  // function Reviewerlogin() {
  //   axios
  //     .post(`${API_ENDPOINT}/reviewer/login`, {
  //       email: reviewerloginEmail,
  //       password: reviewerloginPassword,
  //     })
  //     .then(
  //       (response) => {
  //         console.log(response, "rresponse");
  //         if (response.data.status === true) {
  //           localStorage.setItem("Reviewer-email", reviewerloginEmail);
  //           localStorage.setItem("Reviewertoken", response.data.token);

  //           navigate("/ReviewerLogin", {
  //             state: {
  //               ReviewerEmail: reviewerloginEmail,
  //             },
  //           });
  //         } else {
  //           console.log("wrong Details");
  //           setlogin1alert(true)
  //         }
  //       },
  //       (error) => {
  //         console.log(error);
  //       }
  //     );
  // }

  // function adminLogin() {
  //   axios
  //     .post(`${API_ENDPOINT}/admin/login`, {
  //       email: adminloginEmail,
  //       password: adminloginPassword,
  //     })
  //     .then(
  //       (response) => {
  //         localStorage.setItem("Admintoken", response.data.token);
  //         if (response.data.status === true) {
  //           navigate("/adminLogin");
  //         } else {
  //           console.log("wrong Details");
  //           setlogin2alert(true)
  //         }
  //         console.log(response);
  //       },
  //       (error) => {
  //         console.log(error);
  //       }
  //     );
  // }

  // const handleChangeIndex = (index) => {
  //   setValue(index);
  // };

  return (
    // <div className={classes.root}>
    //   <AppBar position="static" color="default">
    //     <Tabs
    //       value={value}
    //       onChange={handleChange}
    //       indicatorColor="primary"
    //       textColor="primary"
    //       variant="fullWidth"
    //       aria-label="full width tabs example"
    //     >
    //       <Tab label="Login as User" {...a11yProps(0)} />
    //       <Tab label="Login us Reviewer" {...a11yProps(1)} />
    //       <Tab label="Login as Admin" {...a11yProps(2)} />
    //     </Tabs>
    //   </AppBar>
    //   <SwipeableViews
    //     axis={theme.direction === "rtl" ? "x-reverse" : "x"}
    //     index={value}
    //     onChangeIndex={handleChangeIndex}
    //   >
    //     <TabPanel value={value} index={0} dir={theme.direction}>
    //       {signup ? (
    //         <>
    //           <div className="login-con">
    //             <h2>Sign UP</h2>

    //             <div className="login-input-con">
    //               <input
    //                 type="text"
    //                 placeholder="User-Name"
    //                 onChange={(e) => setSignUpUserName(e.target.value)}
    //               />
    //               <input
    //                 type="email"
    //                 placeholder="Email"
    //                 onChange={(e) => setSignUpEmail(e.target.value)}
    //               />
    //               <input
    //                 type="password"
    //                 placeholder="Password"
    //                 onChange={(e) => setSignUpPassword(e.target.value)}
    //               />

    //               {

    //                 userSignUpTost ? <strong style={{ color: "green" }}>Sign up Sucessfull</strong> : ""


    //               }
    //               {
    //                 userSignUpTost1 ? <strong style={{ color: "red" }}>SignUP not Sucessfull</strong> : ""
    //               }

    //               <button onClick={usersignup}>Sign UP</button>
    //             </div>
    //           </div>
    //         </>
    //       ) : (
    //         <div className="login-con">
    //           <h2>Login</h2>

    //           <div className="login-input-con">
    //             <input
    //               type="email"
    //               placeholder="email"
    //               onChange={(e) => setloginUpEmail(e.target.value)}
    //             />
    //             <input
    //               type="password"
    //               placeholder="Password"
    //               onChange={(e) => setloginPassword(e.target.value)}
    //             />
    //             <span>
    //               Already a User <u onClick={() => setSignUp(true)}>Sign Up</u>
    //             </span>
    //             {
    //               loginalert ?  <strong style={{ color: "red" }}>Wrong Details</strong> : ""
    //             }
    //             <button onClick={userlogin}>Login</button>
    //           </div>
    //         </div>
    //       )}
    //     </TabPanel>
    //     <TabPanel value={value} index={1} dir={theme.direction}>
    //       {ReviewerSignUp ? (
    //         <div className="login-con">
    //           <h2>Sign UP</h2>

    //           <div className="login-input-con new">
    //             <input
    //               type="text"
    //               placeholder="User Name"
    //               onChange={(e) => setSignUpReviewerUserName(e.target.value)}
    //             />
    //             <input
    //               type="email"
    //               placeholder="email"
    //               onChange={(e) => setSignUpReviewerEmail(e.target.value)}
    //             />
    //             <input
    //               type="password"
    //               placeholder="Password"
    //               onChange={(e) => setSignUpReviewerPassword(e.target.value)}
    //             />
    //             {

    //               reivewerSignUpTost ? <strong style={{ color: "green" }}>Sign up Sucessfull</strong> : ""


    //             }
    //             {
    //               reivewerSignUpTost1 ? <strong style={{ color: "red" }}>SignUP not Sucessfull</strong> : ""
    //             }
    //             <button onClick={ReviewverSignup}>Sign UP</button>
    //           </div>
    //         </div>
    //       ) : (
    //         <div className="login-con">
    //           <h2>Login</h2>

    //           <div className="login-input-con new">
    //             <input
    //               type="email"
    //               placeholder="email"
    //               onChange={(e) => setreviewerloginUpEmail(e.target.value)}
    //             />
    //             <input
    //               type="password"
    //               placeholder="Password"
    //               onChange={(e) => setreviewerloginPassword(e.target.value)}
    //             />
    //             <span>
    //               Already a User{" "}
    //               <u onClick={() => setReviewerSignUp(true)}>Sign Up</u>
    //             </span>
    //             {
    //               login1alert ?  <strong style={{ color: "red" }}>Wrong Details</strong> : ""
    //             }
    //             <button onClick={Reviewerlogin}>Login</button>
    //           </div>
    //         </div>
    //       )}
    //     </TabPanel>
    //     <TabPanel value={value} index={2} dir={theme.direction}>
    //       <div className="login-con">
    //         <h2>Login</h2>

    //         <div className="login-input-con new">
    //           <input
    //             type="email"
    //             placeholder="email"
    //             onChange={(e) => setadminloginUpEmail(e.target.value)}
    //           />
    //           <input
    //             type="password"
    //             placeholder="Password"
    //             onChange={(e) => setadminloginPassword(e.target.value)}
    //           />

    //           {
    //               login2alert ?  <strong style={{ color: "red" }}>Wrong Details</strong> : ""
    //             }
    //           <button onClick={adminLogin}>Login</button>
    //         </div>
    //       </div>
    //     </TabPanel>
    //   </SwipeableViews>
    // </div>
    <>
      <div className="loginRight">


        <div className="loginBtn chairman">
          <NavLink to="/admin/login">Continue as Chairman</NavLink>
        </div>
        <div className="loginBtn committee">
          <NavLink to="/committee/login">Continue as Committee member</NavLink>
        </div>
        <div className="loginBtn author">
          <NavLink to="/author/login">Continue as Author</NavLink>
        </div>
        <div className="loginBtn guest">
          <NavLink to="/guest/login">Continue as Guest</NavLink>
        </div>





      </div>
    </>
  );
}
