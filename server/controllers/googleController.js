const googleController = {};

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URL = process.env.REDIRECT_URL;

googleController.login = (req, res, next) => {
  res.locals.login = req.body.email;
  next();
};

module.exports = googleController;
