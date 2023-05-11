const express = require("express");
const router = express.Router();
const reviewer = require("../controller/reviewer");
const auth = require("../auth/reviewerMiddleware");

// post signup from application

router.post("/login", reviewer.login);
router.post("/signup", reviewer.signup);
router.get("/project", auth, reviewer.projects);
router.get("/reviewer/project", auth, reviewer.project);
router.post("/approve", reviewer.reviewerApproval);

module.exports = router;
