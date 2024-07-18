const router = require('express').Router();

router.use('/projects', require('./api/projects'))

module.exports = router;