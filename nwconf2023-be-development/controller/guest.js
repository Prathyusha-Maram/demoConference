const jwt = require("jsonwebtoken");
const bookidgen = require("bookidgen");
const moment = require("moment");
const config = require("../config");
const { db } = require("../firebase");
const { sentGuestInvation } = require("../mail/mail");

const signup = async (req, res) => {
  var data = { ...req.body };
  const userPresent = await db.collection("guest").doc(data.Email).get();
  if (userPresent.exists) {
    res.json({
      message: "reviewer already exist",
      status: false,
    });
  } else {
    let user = await db.collection("guest").doc(data.Email).set(data);
    if (user) {
      res.json({ message: "Guest saved succesfully", status: true });
      sentGuestInvation(data.Email);
    } else {
      res.json({ message: "Guest not saved", status: false });
    }
  }
}

module.exports = {
  signup,
};