const jwt = require("jsonwebtoken");
const config = require("../config");
const { db } = require("../firebase");
const { sendReviewerNotifyMail, sendPaperResponse, sentRegistrationSuccess } = require("../mail/mail");

const login = async (req, res) => {
  let { email, password } = req.body;
  try {
    if (!email || !password) {
      res.json({ message: "enter all data", status: false });
    } else {
      const users = await db.collection("chairman").doc(email).get();
      if (!users.exists) {
        res.json({
          msg: "User doesn't exist",
        });
      } else {
        const data = users.data();
        let token = await jwt.sign(
          {
            id: data.email,
          },
          config.JWT_TOKEN_KEY
        );
        if (data.password == password) {
          res.json({
            message: "login successfully",
            token: token,
            status: true,
          });
        } else {
          res.json({
            message: "Invalid UserName/password",
            status: false,
          });
        }
      }
    }
  } catch (error) {
    res.json({ message: error.message, status: false });
  }
};

const project = async (req, res) => {
  try {
    const email = req.data.id;
    const users = await db.collection("chairman").doc(email).get();
    if (!users.exists) {
      res.json({
        msg: "User doesn't exist",
      });
    } else {
      let data = {
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        updatedAt: Date.now(),
        areaOfInterest,
      };
      res.json({ project: data, status: true});
    }
  } catch (error) {
    res.json({ message: error.message, status: false });
  }
};

const signup = async (req, res) => {
  let { firstName, lastName, password, confirmPassword, email, areaOfInterest } = req.body;
  try {
    if (!firstName || !lastName || !password || !confirmPassword || !email || !areaOfInterest) {
      res.json({ message: "enter all data", status: false });
    } else {
      const userPresent = await db.collection("chairman").doc(email).get();
      if (userPresent.exists) {
        res.json({
          message: "chairman already exist",
          status: false,
        });
      } else {
        if (password != confirmPassword) {
          res.json({ message: "check your password", status: false });
        } else {
          let data = {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            updatedAt: Date.now(),
            areaOfInterest,
          };
          let user = await db.collection("chairman").doc(email).set(data);
          if (user) {
            res.json({ message: "Chairman saved succesfully", status: true });
            sentRegistrationSuccess(email);
          } else {
            res.json({ message: "Chairman not saved", status: false });
          }
        }
      }
    }
  } catch (error) {
    res.json({ message: error.message, status: false });
  }
};

const projects = async (req, res) => {
  try {
    const data = await db.collection("user").get();
    let project = [];
    data.forEach((doc) => {
      project.push(doc.data());
    });
    let clean = project.map(({ password, ...rest }) => ({ ...rest }));
    res.json({ project: clean, status: true });
  } catch (error) {
    res.json({ message: error.message, status: false });
  }
};

const approve = async (req, res) => {
  let { approved, email } = req.body;
  try {
    if (!email) {
      res.json({ message: "Enter email id", status: false });
    } else {
      const users = await db.collection("user").doc(email).get();
      if (!users.exists) {
        res.json({
          msg: "User doesn't exist",
        });
      } else {
        let data = {
          approved,
          updatedAt: Date.now(),
        };
        let upload = await db
          .collection("user")
          .doc(email)
          .set(data, { merge: true });
        if (upload) {
          sendPaperResponse(email, approved);
          res.json({
            message:
              approved === "Approved"
                ? "Approved Successfully"
                : "Rejected Successfully",
            status: true,
          });
        } else {
          res.json({
            message: "Approval/Rejection process failed",
            status: false,
          });
        }
      }
    }
  } catch (error) {
    res.json({ message: error.message, status: false });
  }
};

const addReviewer = async (req, res) => {
  let { reviewers, email } = req.body;
  try {
    if (!email || !reviewers) {
      res.json({ message: "Enter all data", status: false });
    } else {
      if (reviewers.length < 1)
        return res.json({
          message: "Please add Reviewers",
          status: false,
        });
      const users = await db.collection("user").doc(email).get();
      if (!users.exists) {
        res.json({
          msg: "User doesn't exist",
        });
      } else {
        let upload = await db.collection("user").doc(email).set(
          {
            reviewers: reviewers,
          },
          { merge: true }
        );
        if (upload) {
          let emails = reviewers.map((user) => user.email);
          sendReviewerNotifyMail(emails);
          res.json({
            message: "updated successfully",
            status: true,
          });
        } else {
          res.json({
            message: "process failed",
            status: false,
          });
        }
      }
    }
  } catch (error) {
    res.json({ message: error.message, status: false });
  }
};

const reviewer = async (req, res) => {
  try {
    const data = await db.collection("reviewer").get();
    let project = [];
    data.forEach((doc) => {
      project.push(doc.data());
    });
    let clean = project.map(({ password, ...rest }) => ({ ...rest }));
    res.json({ data: clean, status: true });
  } catch (error) {
    res.json({ message: error.message, status: false });
  }
};

const approvedProjects = async (req, res) => {
  try {
    const data = await db.collection("user").get();
    let project = [];
    data.forEach((doc) => {
      project.push(doc.data());
    });
    let clean = project.map(({ password, ...rest }) => ({ ...rest }));
    let newData = [];
    clean.forEach((ele) => {
      if (ele.approved === "Approved") {
        newData.push(ele);
      }
    });
    res.json({ project: newData, status: true });
  } catch (error) {
    res.json({ message: error.message, status: false });
  }
};

module.exports = {
  login,
  projects,
  approve,
  addReviewer,
  reviewer,
  approvedProjects,
  signup,
  project,
};
