const express = require("express");
const router = express.Router();
const admin = require("../controller/admin");
const auth = require("../auth/adminMiddleware");

// post signup from application
router.post("/login", admin.login);
router.post("/signup", admin.signup);
router.get("/projects", auth, admin.projects);
router.get("/project", auth, admin.project);
router.post("/approve", auth, admin.approve);
router.post("/add/reviewer", auth, admin.addReviewer);
router.get("/reviewer", auth, admin.reviewer);
router.get("/guest", auth, admin.guest);
router.get("/reviewers", admin.reviewer);
router.get("/approved/projects", admin.approvedProjects);
router.post("/reviewerApprove", admin.reviewerApprove);

module.exports = router;
