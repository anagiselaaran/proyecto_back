const { getUsers } = require('../../controllers/user.controller');

const router = require('express').Router();


router.get('/', getUsers);

router.post('/new', createUser);

router.put('/edit/:userId', UpdateUser);

router.delete('/:userid', deleteUser);




module.exports = router;