const express = require("express");
const router = express.Router();
const admin = require("../controller/admin");
const auth = require("../auth/adminMiddleware");

// post signup from application
router.post("/login", admin.login);
router.get("/projects", auth, admin.projects);
router.post("/approve", auth, admin.approve);
router.post("/add/reviewer", auth, admin.addReviewer);
router.get("/reviewer", auth, admin.reviewer);
router.get("/reviewers", admin.reviewer);
router.get("/approved/projects", admin.approvedProjects);

module.exports = router;
