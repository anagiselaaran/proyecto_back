const { getUsers, createUser, updateUser, deleteUser, login } = require('../../controllers/user.controller');

const router = require('express').Router();


router.get('/', getUsers);

router.post('/new', createUser);
router.post('/login', login);

router.put('/edit/:userId', updateUser);

router.delete('/:userId', deleteUser);



module.exports = router;