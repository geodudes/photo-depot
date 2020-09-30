const db = require('../models/model');
const queries = require('../utils/queries');
const jwtDecode = require('jwt-decode');

const userController = {};

// =================================== //

userController.createUser = (req, res, next) => {
  const { email, name, sub } = jwtDecode(res.locals.token); // gives us email, name, sub -- which is the unique ID of the user's google account

  // create user in the database

  res.locals.userInfo = { email, name, sub }
  return next();
};

// =================================== //

module.exports = userController;