const { getUsers, createUser, updateUser, deleteUser, login, updatePassword } = require('../../controllers/user.controller');
const { checkToken, checkUserByEmail } = require('../../utils/middlewares');

const router = require('express').Router();


router.get('/', getUsers);

router.post('/new', checkUserByEmail, createUser);
router.post('/login', login);

router.put('/edit/:userId', updateUser);
// middleware
router.put('/profile/edit/:userId', checkToken, updatePassword);

router.delete('/:userId', deleteUser);



module.exports = router;