const jwt = require("jsonwebtoken");
const config = require("../config");
const { db } = require("../firebase");
const { sendReviewerNotifyMail, sendPaperResponse } = require("../mail/mail");

const login = async (req, res) => {
  let { email, password } = req.body;
  try {
    if (!email || !password) {
      res.json({ message: "Enter email and password", status: false });
    } else {
      if (
        email.trim() === "admin@gmail.com" &&
        password.trim() === "admin@123"
      ) {
        const token = await jwt.sign(
          {
            admin: true,
            email,
          },
          config.JWT_TOKEN_KEY
        );
        res.json({ message: "Admin can login", status: true, token });
      } else {
        res.json({ message: "Ivalid credentials", status: false });
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
};
