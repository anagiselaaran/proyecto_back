const router = require('express').Router();


router.use("/projects", require('./api/projects'));
router.use("/work-hours", require('./api/times'));

module.exports = router;