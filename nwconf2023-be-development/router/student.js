const express = require("express");
const router = express.Router();
const student = require("../controller/student");
const auth = require("../auth/middleware");

// post signup from application
router.post("/signup", student.signup);
router.post("/login", student.login);
router.post("/project", auth, student.project);
router.post("/withdraw/project", auth, student.projectWithdrawal);
router.get("/my/project", auth, student.myProject);

module.exports = router;
