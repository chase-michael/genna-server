const express = require('express');
const router = express.Router();
const controllers = require('../controllers/util');

router.get('/getImageColors', controllers.getImageColors);

module.exports = router;