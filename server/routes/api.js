const express = require("express");
const router = express.Router();
const googleController = require("../controllers/googleController")

/*
  On front end, request goes to: '/api/login'
*/

router.post('/login', googleController.login, (req, res) => {
  console.log('this is getting sent back', res.locals.login)
  return res.status(200).send(res.locals.login);
});

module.exports = router;