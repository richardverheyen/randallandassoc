const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");
const cors = require("cors")({ origin: true });
admin.initializeApp();

// code example here: https://edigleyssonsilva.medium.com/cloud-functions-for-firebase-sending-e-mail-1f2631d1022e

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

exports.contactUsForm = functions
  .https
  .onRequest((req, res) => {
    cors(req, res, async () => {
      const { name, email, areaOfEnquiry, message } = req.body;

      const mailOptions = {
        from: `🟩 Webform Response <rich@goodcallcopywriting.com>`, // Something like: Jane Doe <janedoe@gmail.com>
        // to: "mail@randallandassoc.com",
        to: "richard.verheyen@gmail.com",
        subject: areaOfEnquiry || "No subject stated", // email subject
        html: `
                <p>Name: ${name}</p>
                <p>Email: ${email}</p>
                <p>Message:</p>
                <p>${message}</p>
            `,
      };

      // returning result
      let info = await transporter.sendMail(mailOptions);

      return res.status(200).send({ info });
    });
  });
