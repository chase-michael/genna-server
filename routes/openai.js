const express = require('express');
const router = express.Router();
const controllers = require('../controllers/openai');

router.post('/getImageGenerations', controllers.getImageGenerations);
router.post('/getGuidedByAiOptions', controllers.getGuidedByAiOptions);

module.exports = router;