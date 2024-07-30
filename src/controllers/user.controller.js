const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const Project = require('../models/projects.model');
const { createToken } = require('../utils/helpers')
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
        const [users] = await User.selectUsersByProject(projectId); //Destructuring//
        console.log(users);
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

        req.body.password = bcrypt.hashSync(req.body.email, 10);
        const [send] = await User.insert(req.body);
        console.log(send);
        const [users] = await User.selectById(send.insertId)
        res.json(users[0]);

    } catch (error) {
        res.status(500).json({ message: error.message })

    }
}
const getUserById = async (req, res) => {
    // TODO: Change userId from params to req.user.id
    const { userId } = req.params;
    try {
        const [user] = await User.selectById(userId)
        res.json(user[0])
    } catch (error) {
        res.status(500).json({ message: error.message })

    }
}
const getByName = async (req, res) => {
    const { name } = req.params
   try {
     const [user] = await User.selectByName(name)
     res.json(user)
   } catch (error) {
       res.status(500).json({ message: error.message })
   }
  
}

const login = async (req, res) => {
    const { email, password } = req.body;
    const [users] = await User.selectByEmail(email);
    // TODO: Test error return when token exists and click login button
    try {
        //comprobamos si el email existe en nuestra base de datos
        if (users === 0) {
            // TODO: Test return for users. Fix if
            return res.status(404).json({ message: 'Error  Email/Password' })
        }
        const user = users[0]
        const verify = bcrypt.compareSync(password, user.password);
        if (!verify) {
            return res.status(404).json({ message: 'Error  Email/Password' })
        }

        res.json({
            message: 'Correct Login, Welcome',
            token: createToken(user),
        })
    } catch (error) {
        console.log(error);
    }
}

//peticion para actualizar datos del usuario
const updateUser = async (req, res) => {
    // TODO: Test method after route change
    try {
        const userId = req.user.id
        await User.updateById(userId, req.body);
        const [user] = await User.selectById(userId);
        res.json(user[0]);
    } catch (error) {
        res.status(500).json({ message: error.message })

    }
}
const updatePassword = async (req, res) => {
    console.log("aqui estamos")
    // TODO: Test method after route change
    const userData = req.user;
    console.log(req.body, req.user)
    const verify = bcrypt.compareSync(req.body.oldPassword, userData.password)

    if (!verify) {
        return res.status(404).json({ message: 'Error  Password' })
    }

    try {
        hashedNewPassword = bcrypt.hashSync(req.body.newPassword, 10)
        console.log(hashedNewPassword)
        const result = await User.updateByIdPassword(hashedNewPassword, userData.id );
        res.json({ message: 'Password updated' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
//peticion para conseguir todos los proyectos en los que este dado de alta un usuario 
const getProjectsByUserId = async (req, res) => {

    try {   
        const [projects] = await User.getProjectsByUser(req.user.id);
        res.json(projects);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
//peticion para actualizar las horas de un usuario en un proyecto
const updateHours = async (req, res) => {
    try {
        const userId = req.user.id;
         await User.updateHoursOfProject(userId, req.body.projectId, req.body.hours);
        const [response] = await User.getHoursByProject(userId, req.body.projectId)
         res.json(response[0]); 
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
    getUsersByProject,
    createUser,
    getUserById,
    login,
    updateUser,
    updatePassword,
    getProjectsByUserId,
    getByName,
    updateHours,
    deleteUser
};
