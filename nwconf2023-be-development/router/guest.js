const express = require("express");
const router = express.Router();
const guest = require("../controller/guest");
const auth = require("../auth/guestMiddleware");

// post signup from application
router.post("/signup", guest.signup);

module.exports = router;
