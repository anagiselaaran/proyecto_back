const User = require('../models/user.model');

const getUsers = async (req, res) => {
  
    try {
        const [users] = await User.selectAll()
        res.json(users)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const createUser = async (req, res) => {
    try {
        const [send] = await User.insert(req.body);
        const [users] = await User.SelectById(send.insertId)
        res.json(users[0]);
    } catch (error) {
        res.status(500).json({ message: error.message })

    }
}

const updateUser = async (req, res) => {
    const { userId } = req.params;
    try {
        await User.updateById(userId, req.body);
        const [user] = await User.SelectById(userId);
        res.json(user[0]);
    } catch (error) {
        res.status(500).json({ message: error.message })

    }
}

module.exports = {
    getUsers,
    createUser,
    updateUser
}