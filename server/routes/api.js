const express = require("express");
const router = express.Router();
const googleController = require("../controllers/googleController")

/*
  On front end, request goes to: '/api/login'
*/

router.get('/getAuthURL', googleController.getAuthURL, (req, res) => {
  return res.redirect(res.locals.url);
});

module.exports = router;