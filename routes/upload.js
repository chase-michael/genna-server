const express = require('express');
const router = express.Router();
const multer  = require('multer');
const upload = multer({ dest: 'uploads/' });
const controllers = require('../controllers/upload');

router.post('/uploadWork', upload.single('image'), controllers.saveWork);

module.exports = router;