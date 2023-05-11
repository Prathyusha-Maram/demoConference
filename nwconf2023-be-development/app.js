const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const app = express();
// const config = require("./config");
const admin = require("./router/admin");
const application = require("./router/application");
const reviewer = require("./router/reviewer");
const guest = require("./router/guest");
const meta = require("./router/meta");
const fileupload = require("express-fileupload");

// security
app.use(helmet());

// cors
app.use(cors());

// convert everything to json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileupload({ useTempFiles: true }));

app.get("/", (req, res) => res.send("success"));
app.use("/api", application);
app.use("/api", meta);

app.use("/api/admin", admin);
app.use("/api/reviewer", reviewer);
app.use("/api/guest", guest);

module.exports = app;
