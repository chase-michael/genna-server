const express = require('express');
const router = express.Router();
const controllers = require('../controllers/openai');

router.post('/getImageGenerations', controllers.getImageGenerations);

module.exports = router;