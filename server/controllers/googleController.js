const { google } = require("googleapis");

/*
  documentation that will explain everything below: https://www.npmjs.com/package/googleapis#oauth2-client
*/

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URL = process.env.REDIRECT_URL;

const googleController = {};

// =================================== //

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

  // the link that we use to redirect to the consent page
  const url = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: scopes,
    response_type: "code",
    prompt: "consent",
  });

  res.locals.url = url;
  return next();
};

// =================================== //

googleController.getAuthCode = (req, res, next) => {
  const oauth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URL
  );

  const { tokens } = await oauth2Client.getToken(code);

  oauth2Client.setCredentials(tokens)
  return next();
};

// =================================== //

module.exports = googleController;
