const nodemailer = require("nodemailer");

const sendAuthorMail = async (mail, document, title, paperID) => {
  const body = {
    from: "conference2023@naveenrio.me",
    to: mail,
    subject: `Paper submitted`,
    html: 
      document !== ""
        ?`<div>
        <p>Hi,</p>
        <br>
        <p>Thank you for submitting your work. Your paper has been successfully submitted with the title <b>"${title}"</b> and the paper id is <b>"${paperID}"</b>. You can view your submission status through the link below.</p>
        <p>Link to view status of the paper: {Author / student login link}</p>
        <br>
        <p>Sincerely,</p>
        <p style="font-family: Arial, sans-serif; font-size: 12px; color: #555555; margin-bottom: 4px;">The Chair Person</p>
        <p style="font-family: Arial, sans-serif; font-size: 10px; color: #777777; margin-bottom: 0;">NWCONF2023</p>

        </div>`

        :`<div>
        <p>Thank you for submitting your work. Your abstract has been successfully submitted with the title <b>"${title}"</b> and the paper is yet to be submitted (in .pdf format). You can submit the paper/poster through the link below.</p>
        <p>Link to submit paper: {Author / student login link}</p>
        <br>
        <p>Sincerely,</p>
        <p style="font-family: Arial, sans-serif; font-size: 12px; color: #555555; margin-bottom: 4px;">The Chair Person</p>
        <p style="font-family: Arial, sans-serif; font-size: 10px; color: #777777; margin-bottom: 0;">NWCONF2023</p>

        </div>`
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

const sendReviewerNotifyMail = async (email, title, paperID) => {
  const body = {
    from: "conference2023@naveenrio.me",
    to: email,
    subject: `New paper assigned for review`,
    html: `<div> 
      <p>Hi,</p>
      <br>
      <p>A new paper has been assigned for you to review on NWCONF2023. Please review it as soon as possible.</p>
      <p>The details of the paper goes as follows: 
      <p>Title : <b>"${title}"</b></p>
      <Paper ID : <b>"${paperID}"</b>
      <br>
      <p>Sincerely,</p>
      <p style="font-family: Arial, sans-serif; font-size: 12px; color: #555555; margin-bottom: 4px;">The Chair Person</p>
      <p style="font-fa
      </div>`,
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

const sendPaperResponse = async (email, approved, title, paperID) => {
  const body = {
    from: "conference2023@naveenrio.me",
    to: email,
    subject: `Paper Status`,
    html:
      approved !== "Rejected"
        ? `<div>
        <p>Hi,</p>
        <br>
        <p>Thank you for submitting your paper <b>"${title}"</b> and id <b>"${paperID}"</b>. We are excited to congratulate you that your paper has been approved by the NWCONF2023. You can view the reviewer comments from the link below and make appropriate changes if needed and submit the paper using the “Camera Ready” format. A sample template is also provided below.</p>
        <p>Link to review comments: “{Author login link}”</p>
        <p>Camera Ready Template: <a href="https://res.cloudinary.com/dd1uzjqg8/image/upload/v1684623091/CameraReadyTemplate_tut5sj.pdf" target="_blank">CAMERA READY TEMPLATE</a> </p>
        <p>At this time, we also want to remind you of your presentation in the conference. To attend the conference, register to it via link given below and follow given steps.</p>
        <p>Link to payment: “{Author Login Link}”
        Step 1: Login to the site
        Step 2: Click on check status
        Step 3: Click on payment button
        Step 4: Complete the payment via any of the payment methods
        </p>        
        <p>We are excited to move forward with your submission. Please feel free to email me with any questions.</p>
        <br>
        <p>Sincerely,</p>
        <p style="font-family: Arial, sans-serif; font-size: 12px; color: #555555; margin-bottom: 4px;">The Chair Person</p>
        <p style="font-family: Arial, sans-serif; font-size: 10px; color: #777777; margin-bottom: 0;">NWCONF2023</p>

        </div>`

        : `<div>
        <p>Hi,</p>
        <br>
        <p>Thank you for submitting your paper <b>"${title}"</b>.Following careful consideration by the NWCONF2023 expert reviewers, I regret to inform you that we are unable to accept your submission.</p>
        <p>Specific concerns expressed during peer review can be viewed via the link provided below.</p>
        <p><a href="{author login link}">Link</a></p>
        <p>We are including the reviewers' comments in this email for your reference. I hope you find this information helpful.</p>
        <br>
        <p>Sincerely,</p>
        <p style="font-family: Arial, sans-serif; font-size: 12px; color: #555555; margin-bottom: 4px;">The Chair Person</p>
        <p style="font-family: Arial, sans-serif; font-size: 10px; color: #777777; margin-bottom: 0;">NWCONF2023</p>

        </div>`,
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
    subject: `Northwest Conference`,
    html: `<div>
        <p>Hi,</p>
        <br>
        <p>Thank you for completing your payment and registering for the conference.</p>
        <p>Welcome to NWCONF2023. You can view the venue of the conference via the link below.</p>
        <p>Link to view venue details: {conference link}</p>
        <br>
        <p>Sincerely,</p>
        <p style="font-family: Arial, sans-serif; font-size: 12px; color: #555555; margin-bottom: 4px;">The Chair Person</p>
        <p style="font-family: Arial, sans-serif; font-size: 10px; color: #777777; margin-bottom: 0;">NWCONF2023</p>
        
        </div>`,
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
    subject: `Northwest Conference`,
    html: `<div>
          <p>Hi,</p>
          <br>
          <p>Thank you for registering and welcome to the Northwest Conference. You can submit your work on the website from the link below.</p>
          <p>Link to submit paper: {Author / student login link}</p>
          <br>
          <p>Sincerely,</p>
          <p style="font-family: Arial, sans-serif; font-size: 12px; color: #555555; margin-bottom: 4px;">The Chair Person</p>
          <p style="font-family: Arial, sans-serif; font-size: 10px; color: #777777; margin-bottom: 0;">NWCONF2023</p>
    
          </div>`,
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
