const User = require('../models/user.model');

const getUsers = async (req, res) => {
    try {
        const [users] = await User.selectAll()
        resizeBy.json(users)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const createUser = async (req, res) => {
    try {
        const [send] = await User.insert(req.body);
        const [users] = await User.SelectById(send.insertId)
        res.json(...clientes);
    } catch (error) {
        
    }
}

module.exports = {
    getUsers,
    createUser,
}