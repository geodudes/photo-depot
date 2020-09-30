const express = require("express");
const router = express.Router();

const tagController = require('../controllers/tagController')

router.get('/', tagController.getTags, (req, res) => {
  return res.status(200).json(res.locals.data);
})

router.post('/', tagController.addTag, (req, res) => {
  return res.status(200).json(res.locals.data);
})

router.put('/:tagid', tagController.updateTag, (req, res) => {
  return res.status(200).json({});
})

router.delete('/:tagid', tagController.deleteTag, (req, res) => {
  return res.status(200).json({});
})

module.exports = router;
