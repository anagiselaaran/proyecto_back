const router = require('express').Router();

router.use('/projects', require('./api/projects'))
router.use('/users', require('./api/users'));

module.exports = router;