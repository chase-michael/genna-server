const express = require('express');
const router = express.Router();
const multer  = require('multer');
const upload = multer({ dest: 'uploads/' });
const controllers = require('../controllers/auth');

router.post('/createAccount', upload.single('profileImage'), controllers.createAccount);
router.post('/signin', controllers.signin);
router.get('/emailInUse', controllers.emailInUse);
router.get('/displayNameInUse', controllers.displayNameInUse);
router.post('/validateAuthToken', controllers.validateAuthToken)

module.exports = router;