const jwt = require("jsonwebtoken");
const bookidgen = require("bookidgen");
const moment = require("moment");
const config = require("../config");
const { db } = require("../firebase");
const { needReviewAuthor, sentRegistrationSuccess } = require("../mail/mail");

const login = async (req, res) => {
  let { email, password } = req.body;
  try {
    if (!email || !password) {
      res.json({ message: "enter all data", status: false });
    } else {
      const users = await db.collection("reviewer").doc(email).get();
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
  } catch (err) {
    res.json({ message: err.message, status: false });
  }
};

const signup = async (req, res) => {
  let { firstName, lastName, password, confirmPassword, email, areaOfInterest } = req.body;
  try {
    if (!firstName || !lastName || !password || !confirmPassword || !email || !areaOfInterest) {
      res.json({ message: "enter all data", status: false });
    } else {
      const userPresent = await db.collection("reviewer").doc(email).get();
      if (userPresent.exists) {
        res.json({
          message: "reviewer already exist",
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
          let user = await db.collection("reviewer").doc(email).set(data);
          if (user) {
            res.json({ message: "Reviewer saved succesfully", status: true });
            sentRegistrationSuccess(email);
          } else {
            res.json({ message: "Reviewer not saved", status: false });
          }
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
      const users = await db.collection("reviewer").doc(email).get();
      if (!users.exists) {
        res.json({
          msg: "User doesn't exist",
        });
      } else {
        let data = {
          firstName,
          lastName,
          email,
          areaOfInterest,
          updatedAt: Date.now(),
        };
        let upload = await db
          .collection("reviewer")
          .doc(email)
          .set(data, { merge: true });
    }
  } catch (error) {
    res.json({ message: error.message, status: false });
  }
};

const projects = async (req, res) => {
  try {
    const email = req.data.id;
    const data = await db.collection("user").get();
    let project = [];
    data.forEach((doc) => {
      project.push(doc.data());
    });
    let clean = project.map(({ password, ...rest }) => ({ ...rest }));
    let value = [];
    clean.forEach((e) => {
      e.reviewers?.forEach((d) => {
        if (d.email === email) {
          value.push(e);
        } else {
        }
      });
    });
    res.json({ project: value, status: true });
  } catch (error) {
    res.json({ message: error.message, status: false });
  }
};
const reviewerApproval = async (req, res) => {
  let { reviewerApproval, email, needReview } = req.body;

  try {
    if (!reviewerApproval || !email) {
      res.json({ message: "Enter all Data", status: false });
    } else {
      const users = await db.collection("user").doc(email).get();
      if (!users.exists) {
        res.json({
          msg: "User doesn't exist",
        });
      } else {
        let data = {
          reviewerApproval,
          updatedAt: Date.now(),
        };
        let upload = await db
          .collection("user")
          .doc(email)
          .set(data, { merge: true });
        if (upload) {
          if (needReview) {
            needReviewAuthor(email);
          } else {
          }
          res.json({
            message: "Status updated successfully",
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

module.exports = {
  login,
  signup,
  projects,
  reviewerApproval,
  project,
};
