const router = require('express').Router();
const { getProjects, getById, getByDepartment, getByActive, createProject, deleteProject } = require('../../controllers/projects.controller');

router.get('/', getProjects);
router.get('/department/:department', getByDepartment);
router.get('/active/:active', getByActive);
router.get('/:projectId', getById);

router.post('/new', createProject);

router.delete('/:projectId', deleteProject);

module.exports = router;