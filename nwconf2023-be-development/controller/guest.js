const jwt = require("jsonwebtoken");
const bookidgen = require("bookidgen");
const moment = require("moment");
const config = require("../config");
const { db } = require("../firebase");
const { sentGuestInvation } = require("../mail/mail");

app.post("/guest", (req, res) => {
    console.log("Geust payment")
    const itemRef = collection(db, "guest");
    var data = { ...req.body };
    console.log(data);
    addDoc(itemRef, data)
        .then(() => {
            sentGuestInvation(data.Email);
        })
        .catch((e) => {
            console.log(e);
        });

    res.status(200).send({ message: "Payment successfull" });
});