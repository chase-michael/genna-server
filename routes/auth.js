const express = require('express');
const router = express.Router();

const { signup, signin, emailInUse, displayNameInUse } = require('../controllers/auth');

router.post('/signup', signup);
router.post('/signin', signin);
router.post('/emailInUse', emailInUse);
router.post('/displayNameInUse', displayNameInUse);

module.exports = router;