const jwt = require('jsonwebtoken');
const User = require('../models/user.model')

//checkToken
// crear middleware
const checkToken = async (req, res, next) => {
    //comprobamos si tiene token
    // console.log(req.headers['authorization'])

    if (!req.headers['authorization']) {
        return res.status(403).json({ message: 'No tiene token' });
    }
    //sacamos el token
    const token = req.headers['authorization'];

    // variable para almacenar los datos del token
    let obj;
    // console.log(token)
    //comprobamos que el token sea valido
    try {
        obj = jwt.verify(token, process.env.SECRET_KEY);
        obj = jwt.decode(token);
        // obj contiene userId y role

    } catch (error) {
        return res.status(403).json({ message: 'el token es incorrecto' });
    }
    const [users] = await User.selectById(obj.userId);
    req.user = users[0];
    next();
}
//checkUserId
const checkUserByEmail = async (req, res, next) => {
    const { email } = req.body;
    const [users] = await User.selectByEmail(email);
    if (users.length !== 0) {

        return res.status(403).json({ message: ' el Email ya existe en la base de datos.  ' });

    }
    next();
}

module.exports = {
    checkToken,
    checkUserByEmail,
}