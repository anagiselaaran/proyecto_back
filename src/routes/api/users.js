const { getUsers, createUser, updateUser, deleteUser } = require('../../controllers/user.controller');

const router = require('express').Router();


router.get('/', getUsers);

router.post('/new', createUser);

router.put('/edit/:userId', updateUser);

router.delete('/:userId', deleteUser);




module.exports = router;