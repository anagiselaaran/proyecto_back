const router = require('express').Router();
const { getProjects, getById, getByDepartment, getByActive, createProject, deleteProject, getByUserIdAndActive, getByUserIdAndDepartment, } = require('../../controllers/projects.controller');
const { checkToken } = require('../../utils/middlewares');

router.get('/', getProjects);
router.get('/department/:department', getByDepartment);
router.get('/active/:active', getByActive);
router.get('/:projectId', getById);
// TIMER PAGE - FILTER METHODS
router.get('/user/active/:active', checkToken, getByUserIdAndActive);
router.get('/user/department/:department', checkToken, getByUserIdAndDepartment);

router.post('/new', checkToken, createProject);

router.delete('/:projectId', deleteProject);

module.exports = router;