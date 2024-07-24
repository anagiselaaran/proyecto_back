const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
<<<<<<< HEAD
const { createToken } = require('../utils/helpers')
=======
const Project = require('../models/projects.model');
const {createToken} = require('../utils/helpers')
>>>>>>> f56986af26588f03591a8f9258e3864236d02923
//peticion para obtener todos los usuarios
const getUsers = async (req, res) => {

    try {
        const [users] = await User.selectAll()
        res.json(users)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
//peticion para obtener todos los usuarios por proyecto
const getUsersByProject = async (req, res) => {
    const { projectId } = req.params;

    try {
        const [users] = await User.getUsersByProject(projectId);
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//peticion para crear usuario
const createUser = async (req, res) => {
    try {
        // bcrypt
        // ver si se hashea la password o se envia y en el envio se hashea
        req.body.password = bcrypt.hashSync(req.body.password, 10);
        const [send] = await User.insert(req.body);
        const [users] = await User.selectById(send.insertId)
        res.json(users[0]);
    } catch (error) {
        res.status(500).json({ message: error.message })

    }
}
const getUserById = async (req, res) => {
    const { userId } = req.params;
    try {
        const [user] = await User.selectById(userId)
        res.json(user[0])
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
<<<<<<< HEAD
    const { oldPassword, newPassword, newRepPassword } = req.body;
    console.log('estamos aqui', req.user)
=======
    console.log("aqui estamos")

>>>>>>> f56986af26588f03591a8f9258e3864236d02923
    const userData = req.user;
    console.log( req.body, req.user)
    const verify = bcrypt.compareSync(req.body.oldPassword, userData.password)

    if (!verify) {
        return res.status(404).json({ message: 'Error  Password' })
    }
<<<<<<< HEAD
    if (newPassword !== newRepPassword) {
        return res.status(404).json({ message: 'Error not the same Password ' })
    }
    try {
        await User.updateByIdPassword(userData.id, newPassword);
=======

    try {
        hashedNewPassword = bcrypt.hashSync(req.body.newPassword, 10)
        console.log(hashedNewPassword)
        const result = await User.updateByIdPassword(hashedNewPassword, userData.id );
        console.log("aqui estoy", result)
>>>>>>> f56986af26588f03591a8f9258e3864236d02923
        res.json({ message: 'Password updated' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
//peticion para conseguir todos los proyectos en los que este dado de alta un usuario NO ESTA TERMINADO
const getProjectsByUserId = async (req, res) => {
    try {
        const { userId } = req.params;
        const [projects] = await Project.getByUserId(userId);
        res.json(projects);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
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
    getUsersByProject,
    createUser,
    getUserById,
    login,
    updateUser,
    updatePassword,
    getProjectsByUserId,
    deleteUser
};
