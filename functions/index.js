const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");
admin.initializeApp();

const { google } = require("googleapis");

const cors = require('cors')({origin:true});

// code example here: https://edigleyssonsilva.medium.com/cloud-functions-for-firebase-sending-e-mail-1f2631d1022e

async function getTransporter() {
  const oAuth2Client = new google.auth.OAuth2(process.env.CLIENT_ID, process.env.CLIENT_SECRET, process.env.REDIRECT_URI)
  oAuth2Client.setCredentials({refresh_token: process.env.REFRESH_TOKEN});
  const accessToken = await oAuth2Client.getAccessToken();
  
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: "richard.verheyen@gmail.com",
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      refreshToken: process.env.REFRESH_TOKEN,
      accessToken: accessToken
    },
  });
  return transporter;
}

exports.contactUsFormFinal = functions
  .region("australia-southeast1")
  .https
  .onRequest((req, res) => {
    cors(req, res, async () => {
      const transporter = await getTransporter();
      const { name, email, areaOfEnquiry, message } = req.body;

      const mailOptions = {
        from: `🟩 Webform Response <richard.verheyen@gmail.com>`, // Something like: Jane Doe <janedoe@gmail.com>
        to: "mail@randallandassoc.com",
        subject: `🟩 Contact form: ${areaOfEnquiry}` || "No subject stated", // email subject
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
