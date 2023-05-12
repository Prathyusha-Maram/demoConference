const jwt = require("jsonwebtoken");
const bookidgen = require("bookidgen");
const moment = require("moment");
const config = require("../config");
const { db } = require("../firebase");
const { sendAuthorMail, sentRegistrationSuccess } = require("../mail/mail");

// post for signup
const signup = async (req, res) => {
  let { firstName, lastName, password, confirmPassword, email, areaOfInterest } = req.body;
  try {
    if (!firstName || !lastName || !password || !confirmPassword || !email || !areaOfInterest) {
      res.json({ message: "enter all data", status: false });
    } else {
      const userPresent = await db.collection("user").doc(email).get();
      if (userPresent.exists) {
        res.json({
          message: "UserName already exist",
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
            title: "",
            abstract: "",
            groupSubmission: false,
            keyword: "",
            reviewers: [],
            reviewerApproval: [],
            document: "",
            approved: "Pending",
            updatedAt: Date.now(),
            areaOfInterest,
          };
          let user = await db.collection("user").doc(email).set(data);
          if (user) {
            res.json({ message: "user saved succesfully", status: true });
            sentRegistrationSuccess(email);
          } else {
            res.json({ message: "user not saved", status: false });
          }
        }
      }
    }
  } catch (error) {
    res.json({ message: error.message, status: false });
  }
};

const login = async (req, res) => {
  let { email, password } = req.body;
  try {
    if (!email || !password) {
      res.json({ message: "enter all data", status: false });
    } else {
      const users = await db.collection("user").doc(email).get();
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

const project = async (req, res) => {
  let { title, abstract, keyword, document, groupSubmission } = req.body;
  try {
    if (!title || !abstract || !keyword) {
      res.json({ message: "enter all data", status: false });
    } else {
      const email = req.data.id;
      const users = await db.collection("user").doc(email).get();
      if (!users.exists) {
        res.json({
          msg: "User doesn't exist",
        });
      } else {
        let data = {
          email,
          title,
          abstract,
          keyword,
          groupSubmission,
          document: document ? document : "",
          updatedAt: Date.now(),
        };
        let upload = await db
          .collection("user")
          .doc(email)
          .set(data, { merge: true });
        if (upload) {
          sendAuthorMail(email);
          res.json({ message: "Project saved succesfully", status: true });
        } else {
          res.json({ message: "Project not saved", status: false });
        }
      }
    }
  } catch (error) {
    res.json({ message: error.message, status: false });
  }
};

const projectWithdrawal = async (req, res) => {
  let { title, abstract, keyword, document, groupSubmission } = req.body;
  try {
    if (false) {
      res.json({ message: "enter all data", status: false });
    } else {
      const email = req.data.id;
      const users = await db.collection("user").doc(email).get();
      if (!users.exists) {
        res.json({
          msg: "User doesn't exist",
        });
      } else {
        let data = {
          email,
          title,
          abstract,
          keyword,
          groupSubmission,
          document: document ? document : "",
          updatedAt: Date.now(),
        };
        let upload = await db
          .collection("user")
          .doc(email)
          .set(data, { merge: true });
        if (upload) {
          res.json({ message: "Project saved succesfully", status: true });
        } else {
          res.json({ message: "Project not saved", status: false });
        }
      }
    }
  } catch (error) {
    res.json({ message: error.message, status: false });
  }
};

const myProject = async (req, res) => {
  try {
    const email = req.data.id;
    const data = (await db.collection("user").doc(email).get()).data();
    let clean = {};
    (clean.title = data.title),
      (clean.document = data.document),
      (clean.abstract = data.abstract),
      (clean.keyword = data.keyword);
    clean.groupSubmission = data.groupSubmission;
    clean.approved = data.approved;
    clean.reviewerApproval = data.reviewerApproval;
    clean.email = data.email;
    clean.firstName = data.firstName;
    clean.lastName = data.lastName;
    clean.areaOfInterest = data.areaOfInterest;

    res.json({ project: clean, status: true });
  } catch (error) {
    res.json({ message: error.message, status: false });
  }
};

module.exports = {
  signup,
  login,
  project,
  myProject,
  projectWithdrawal,
};
