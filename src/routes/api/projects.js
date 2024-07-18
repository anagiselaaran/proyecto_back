const router = require('express').Router();
const { getProjects } = require('../../controllers/projects.controller');

router.get('/', getProjects )

module.exports = router;