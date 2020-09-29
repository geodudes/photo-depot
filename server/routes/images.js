const express = require("express");
const router = express.Router();

const imageController = require('../controllers/imageController')

router.get('/', imageController.getImages, (req, res) => {
  return res.status(200).json(res.locals.data);
})

router.post('/', imageController.addImage, (req, res) => {
  return res.status(200).json(res.locals.data);
})

router.put('/:photoid', imageController.updateImage, (req, res) => {
  return res.status(200).json({});
})

router.delete('/:photoid', imageController.deleteImage, (req, res) => {
  return res.status(200).json({});
})

module.exports = router;
