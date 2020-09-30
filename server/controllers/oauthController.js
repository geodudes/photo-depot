const { google } = require("googleapis");

/*
  documentation that will explain everything below: https://www.npmjs.com/package/googleapis#oauth2-client
*/

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URL = process.env.REDIRECT_URL;

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URL
);

const oauthController = {};

// =================================== //

oauthController.getAuthURL = (req, res, next) => {

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
  console.log('URLLLLL', url)
  return next();
};

// =================================== //

oauthController.getAuthCode = async (req, res, next) => {
  const { tokens } = await oauth2Client.getToken(req.query.code); // Tokens contains access_token, refresh_token, scope, id-token
  oauth2Client.setCredentials(tokens); // Actually logs you in
  res.locals.token = tokens.id_token; // Store the id token for setting the cookie
  return next();
};

// =================================== //

oauthController.setSSIDCookie = (req, res, next) => {
  res.cookie('SSID Cookie', res.locals.token, { httpOnly: true }); // set a cookie with the token ID
  return next();
};

// =================================== //

oauthController.removeCookie = (req, res, next) => {
  res.clearCookie('SSID Cookie');
  return next();
};

// =================================== //

module.exports = oauthController;