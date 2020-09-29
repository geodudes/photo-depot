const { google } = require("googleapis"); // WHERE THE OAUTH IS IMPORTED

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URL = process.env.REDIRECT_URL;

const googleController = {};

googleController.getAuthURL = (req, res, next) => {
  const oauth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URL
  );

  // Asks permissions for these things:
  const scopes = [
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/userinfo.profile",
  ];

  const url = oauth2Client.generateAuthUrl({ // a func built into oauth that, I guess, generates a URL
    access_type: "offline",
    scope: scopes,
    response_type: "code",
    prompt: "consent",
  });

  res.locals.url = url; // returns a request to google, where you give permission -- eventually goes to below
  return next();
};

module.exports = googleController;
