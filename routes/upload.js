const express = require('express');
const router = express.Router();
const multer  = require('multer');
const upload = multer({ dest: 'uploads/' });
const controllers = require('../controllers/upload');

router.post('/uploadWork', upload.single('image'), controllers.saveWork);
router.post('/saveFinalWork', controllers.saveFinalWork);
router.post('/updateProfileImage', upload.single('profileImage'), controllers.updateProfileImage);

module.exports = router;