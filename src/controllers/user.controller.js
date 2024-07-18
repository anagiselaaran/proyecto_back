const User = require('../models/user.model');
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
        const [send] = await User.insert(req.body);
        const [users] = await User.selectById(send.insertId)
        res.json(users[0]);
    } catch (error) {
        res.status(500).json({ message: error.message })

    }
}

const login = async (req, res) => {
    const { email, password } = req.body;
    const [user] = await User.selectByEmail(email)

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
    deleteUser
};
