const express = require("express");
const router = express.Router();
const googleController = require("../controllers/googleController")

/*
  Request comes from Login container

  This route asks for permissions from a user to retrieve an access token
  1. /getAuthURL
    - This harvests a URL which we then use to redirect the user to a consent page
  2. User will then give permission on consent page
  3. Google then redirects the user to the redirect URL that we provided ** see process.env.REDIRECT_URL
    - This will contain a code query parameter ** /oauthcallback?code={authorizationCode}
  4. /login/google
    - This is where we currently have the redirect routed
    - 
*/

router.get('/getAuthURL', googleController.getAuthURL, (req, res) => {
  return res.redirect(res.locals.url);
});

router.get('/login/google', 
  googleController.getAuthCode, 
  // then we should probably set a cookie
  // then we should probably create a user
  (req, res) => {
  return res.redirect(res.locals.url);
});

module.exports = router;