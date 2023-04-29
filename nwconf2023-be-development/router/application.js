const express = require("express");
const router = express.Router();
const application = require("../controller/application");
const auth = require("../auth/middleware");

// post signup from application
router.post("/signup", application.signup);
router.post("/login", application.login);
router.post("/project", auth, application.project);
router.post("/withdraw/project", auth, application.projectWithdrawal);
router.get("/my/project", auth, application.myProject);

module.exports = router;
