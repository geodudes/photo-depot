const db = require('../models/model');
const queries = require('../utils/queries');
const { google } = require("googleapis"); // WHERE THE OAUTH IS IMPORTED

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URL = process.env.REDIRECT_URL;

const googleController = {};

googleController.login = (req, res, next) => {
  console.log(req.body.email);
  next();
};