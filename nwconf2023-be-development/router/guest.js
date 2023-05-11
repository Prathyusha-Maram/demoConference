const express = require("express");
const router = express.Router();
const guest = require("../controller/guest");
const auth = require("../auth/reviewerMiddleware");

// post signup from application

router.post("/guest", guest.guest);

module.exports = router;
