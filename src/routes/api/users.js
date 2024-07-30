const { getUsers, createUser, updateUser, deleteUser, login, updatePassword, getUserById, getProjectsByUserId, getUsersByProject,getByName, updateHours } = require('../../controllers/user.controller');
const { checkToken, checkUserByEmail } = require('../../utils/middlewares');

const router = require('express').Router();


router.get('/', checkToken, getUsers);
router.get('/projects', checkToken, getProjectsByUserId)
router.get('/:userId', getUserById)
router.get('/projects', checkToken, getProjectsByUserId);
/* router.get('/projects/:userId', getProjectsByUserId)
 */router.get('/name/:name', getByName)

router.get('/project_user/:projectId', checkToken, getUsersByProject)

router.post('/new', checkToken, checkUserByEmail, createUser);
router.post('/login', login);

router.put('/edit', checkToken, updateUser);
router.put('/edit/hoursProjects', checkToken, updateHours);
// middleware
router.put('/profile/edit', checkToken, updatePassword);

router.delete('/:userId', checkToken, deleteUser);



module.exports = router;