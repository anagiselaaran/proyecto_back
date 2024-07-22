const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const {createToken} = require('../utils/helpers')
//peticion para obtener todos los usuarios
const getUsers = async (req, res) => {

    try {
        const [users] = await User.selectAll()
        res.json(users)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
//peticion para crear usuario
const createUser = async (req, res) => {
    try {
        // bcrypt 
        req.body.password = bcrypt.hashSync(req.body.password, 10);
        const [send] = await User.insert(req.body);
        const [users] = await User.selectById(send.insertId)
        res.json(users[0]);
    } catch (error) {
        res.status(500).json({ message: error.message })

    }
}

const login = async (req, res) => {
    const { email, password } = req.body;
    const [users] = await User.selectByEmail(email);
    //comprobamos si el email existe en nuestra base de datos
    if (users === 0) {
       return res.status(404).json({ message: 'Error  Email/Password' })
    }
    const user = users[0]
    const verify = bcrypt.compareSync(password, user.password);
    if (!verify) {
       return res.status(404).json({ message: 'Error  Email/Password' })
    }
     
    res.json({
        message: 'Correct Login, Welcome',
        token: createToken(user)
    })
}

//peticion para actualizar datos del usuario
const updateUser = async (req, res) => {
    const { userId } = req.params;
    try {
        await User.updateById(userId, req.body);
        const [user] = await User.selectById(userId);
        res.json(user[0]);
    } catch (error) {
        res.status(500).json({ message: error.message })

    }
}
const updatePassword = async (req, res) => {
    const { oldPassword, newPassword, newRepPassword } = req.body;
    console.log('estamos aqui',req.user)
    const userData = req.user;
    const verify = bcrypt.compareSync(oldPassword, userData.password)
    if (!verify) {
        return res.status(404).json({ message: 'Error  Password' })
    }
    if (newPassword !== newRepPassword) {
        return res.status(404).json({ message: 'Error not the same Password ' })
    }   
    try {
        await User.updateByIdPassword(userData.id,  newPassword );
        res.json({ message: 'Password updated' })
    } catch (error) {
        res.status(500).json({ message: error.message })
        }
}

//peticion para borrar un usuario
const deleteUser = async (req, res) => {
    const { userId } = req.params;
    try {
        const [users] = await User.selectById(userId)
        const [response] = await User.deleteId(userId)
        res.json(users[0]);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = {
    getUsers,
    createUser,
    login,
    updateUser,
    updatePassword,
    deleteUser
};
