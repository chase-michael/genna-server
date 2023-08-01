const express = require('express');
const router = express.Router();
const controllers = require('../controllers/fetch');

router.get('/sampleWorks', controllers.fetchSampleWorks);
router.get('/sampleArtists', controllers.fetchSampleArtists);
router.get('/sampleCollectionWorks', controllers.fetchSampleCollectionWorks);
router.get('/worksByArtist', controllers.fetchWorksByArtist);

module.exports = router;