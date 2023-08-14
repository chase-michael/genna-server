const express = require('express');
const router = express.Router();
const multer  = require('multer');
const upload = multer({ dest: 'uploads/' });
const controllers = require('../controllers/auth');

router.post('/createAccount', upload.single('profileImage'), controllers.createAccount);
router.post('/signin', controllers.signin);
router.get('/emailInUse', controllers.emailInUse);
router.get('/slugInUse', controllers.slugInUse);
router.get('/displayNameInUse', controllers.displayNameInUse);
router.post('/validateAuthToken', controllers.validateAuthToken);
router.get('/getProfileImage', controllers.authMiddleware, controllers.getProfileImage);
router.post('/updateProfileInformation', controllers.updateProfileInformation);

module.exports = router;