const express = require("express");
const router = express.Router();
const googleController = require("../controllers/googleController")

/*
  On front end, request goes to: '/api/login'
*/
router.get('/login', googleController.login, (req, res) => {
  return res.status(200).json(res.locals.data);
});