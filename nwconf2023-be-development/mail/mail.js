const nodemailer = require("nodemailer");

const sendAuthorMail = async (mail) => {
  const body = {
    from: "conference2023@naveenrio.me",
    to: mail,
    subject: `Paper submitted`,
    html: `<div> Hi, your paper was succesfully submitted, Thank your. </div>`,
  };

  const transport = nodemailer.createTransport({
    host: "live.smtp.mailtrap.io", //sandbox.smtp.mailtrap.io",
    port: 587,
    auth: {
      user: "api", //86207576053cfe",
      pass: "82bc5abcc46929231dcc93949027783b", //df87b6e5a6cb1d"
    },
  });

  await transport.sendMail(body, (err) => {
    if (err) {
      return console.log("error occurs", err);
    } else {
      return console.log("email sent");
    }
  });
};

const sendReviewerNotifyMail = async (email) => {
  const body = {
    from: "conference2023@naveenrio.me",
    to: email,
    subject: `New paper assigned for review`,
    html: `<div> Hi, A new paper was assigned for you to review. Please review it as soon as possible </div>`,
  };

  const transport = nodemailer.createTransport({
    host: "live.smtp.mailtrap.io", //sandbox.smtp.mailtrap.io",
    port: 587,
    auth: {
      user: "api", //86207576053cfe",
      pass: "82bc5abcc46929231dcc93949027783b", //df87b6e5a6cb1d"
    },
  });

  await transport.sendMail(body, (err) => {
    if (err) {
      return console.log("error occurs", err);
    } else {
      return console.log("email sent");
    }
  });
};

const sendPaperResponse = async (email, approved) => {
  const body = {
    from: "conference2023@naveenrio.me",
    to: email,
    subject: `Paper Status`,
    html:
      approved === "Approved"
        ? `<div> Congratulations, Your paper was approved by the committee </div>`
        : `<div> Sorry, Your paper was rejected by the committee </div>`,
  };

  const transport = nodemailer.createTransport({
    host: "live.smtp.mailtrap.io", //sandbox.smtp.mailtrap.io",
    port: 587,
    auth: {
      user: "api", //86207576053cfe",
      pass: "82bc5abcc46929231dcc93949027783b", //df87b6e5a6cb1d"
    },
  });

  await transport.sendMail(body, (err) => {
    if (err) {
      return console.log("error occurs", err);
    } else {
      return console.log("email sent");
    }
  });
};

const needReviewAuthor = async (email) => {
  const body = {
    from: "conference2023@naveenrio.me",
    to: email,
    subject: `Paper Status`,
    html: `<div>Your Paper has been Accepted but Need Review</div>`,
  };

  const transport = nodemailer.createTransport({
    host: "live.smtp.mailtrap.io", //sandbox.smtp.mailtrap.io",
    port: 587,
    auth: {
      user: "api", //86207576053cfe",
      pass: "82bc5abcc46929231dcc93949027783b", //df87b6e5a6cb1d"
    },
  });

  await transport.sendMail(body, (err) => {
    if (err) {
      return console.log("error occurs", err);
    } else {
      return console.log("email sent");
    }
  });
};

const sentGuestInvation = async (email) => {
  const body = {
    from: "conference2023@naveenrio.me",
    to: email,
    subject: `Thanks for completing your payment and registering for northwest conference`,
    html: `<div>Welcome to the northwest conference</div>`,
  };

  const transport = nodemailer.createTransport({
    host: "live.smtp.mailtrap.io", //sandbox.smtp.mailtrap.io",
    port: 587,
    auth: {
      user: "api", //86207576053cfe",
      pass: "82bc5abcc46929231dcc93949027783b", //df87b6e5a6cb1d"
    },
  });

  await transport.sendMail(body, (err) => {
    if (err) {
      return console.log("error occurs", err);
    } else {
      return console.log("email sent");
    }
  });
};

const sentRegistrationSuccess = async (email) => {
  const body = {
    from: "conference2023@naveenrio.me",
    to: email,
    subject: `Thanks for registering for northwest conference`,
    html: `<div>Welcome to the Northwest Conference.</div>`,
  };

  const transport = nodemailer.createTransport({
    host: "live.smtp.mailtrap.io", //sandbox.smtp.mailtrap.io",
    port: 587,
    auth: {
      user: "api", //86207576053cfe",
      pass: "82bc5abcc46929231dcc93949027783b", //df87b6e5a6cb1d"
    },
  });

  await transport.sendMail(body, (err) => {
    if (err) {
      return console.log("error occurs", err);
    } else {
      return console.log("email sent");
    }
  });
};

module.exports = {
  sendAuthorMail,
  sendReviewerNotifyMail,
  sendPaperResponse,
  needReviewAuthor,
  sentGuestInvation,
  sentRegistrationSuccess,
};
