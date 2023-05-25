const express = require('express');
const router = express.Router();
const controllers = require('../controllers/search');

router.get('/', controllers.search);
router.get('/getArtistBySlug', controllers.getArtistBySlug);
router.get('/getWorkById', controllers.getWorkById);
router.get('/getArtistById', controllers.getArtistById);

module.exports = router;