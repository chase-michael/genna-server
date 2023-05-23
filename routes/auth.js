const express = require('express');
const router = express.Router();
const multer  = require('multer');
const upload = multer({ dest: 'uploads/' });

const { createAccount, signin, emailInUse, displayNameInUse } = require('../controllers/auth');

router.post('/createAccount', upload.single('profileImage'), createAccount);
router.post('/signin', signin);
router.post('/emailInUse', emailInUse);
router.post('/displayNameInUse', displayNameInUse);

module.exports = router;