const express = require('express');
const router = express.Router();

router.use(require('./user'));
router.use(require('./game'));
router.use(require('./chat'));
//router.use(require('./admin'));


module.exports = router;