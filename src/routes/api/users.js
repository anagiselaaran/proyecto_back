const { getUsers, createUser, updateUser, deleteUser, login, updatePassword, getUserById, getProjectsByUserId, getUsersByProject } = require('../../controllers/user.controller');
const { checkToken, checkUserByEmail } = require('../../utils/middlewares');

const router = require('express').Router();


router.get('/', checkToken, getUsers);
router.get('/:userId', getUserById)
router.get('/projects/:userId', getProjectsByUserId)

router.get('/project_user/:projectId', checkToken, getUsersByProject)

router.post('/new', checkToken, checkUserByEmail, createUser);
router.post('/login', login);

router.put('/edit/:userId', checkToken, updateUser);
// middleware
router.put('/profile/edit/:userId', checkToken, updatePassword);

router.delete('/:userId', checkToken, deleteUser);



module.exports = router;