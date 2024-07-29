
//obtener los usuarios por proyecto
const selectUsersByProject = (projectId) => {
    return db.query(
        `select users.id, users.name, users.surname, users.email, users.department, users.role, users.is_active from users JOIN users_has_projects ON users.id = users_has_projects.id_user where users_has_projects.id_project = ?`, [projectId]
    );
}

//seleccionar todos los usuarios
const selectAll = () => {
    return db.query('select * from users')
}
//seleccionar usuario por id
const selectById = (userId) => {
    return db.query('select * from users where id = ?', [userId])
}
const selectByEmail = (email) => {
    return db.query('select * from users where email = ?', [email])
}
//crear un nnuevo usuario en la base de datos
/* const insert = ({ name, surname, email, role, department, contracted_hours, is_active }) => {

    return db.query('insert into users (name, surname, email, role, department, contracted_hours, is_active )  values (?, ?, ?, ?, ?, ?, ?)',
        [name, surname, email, role, department, contracted_hours, is_active]);
} */
//prueba
const insert = ({ name, surname, email, password, role, department, contracted_hours }) => {
    return db.query('insert into users (name, surname, email, password, role, department, contracted_hours )  values ( ?, ?, ?, ?, ?, ?, ?)',
        [name, surname, email, password, role, department, contracted_hours]);
}

const getProjectsByUser = (userId) => {
    return db.query('select projects.id, projects.name, users_has_projects.hours_by_projects, users_has_projects.date from users_has_projects join projects ON users_has_projects.id_project = projects.id where users_has_projects.id_user = ? ', [userId])
}

//actualizar usuario
const updateById = (userId, { name, surname, email, role, department, contracted_hours, is_active }) => {
    return db.query('update users set name = ?, surname = ?, email = ?, role = ?, department = ?, contracted_hours =?, is_active = ? where id =?',
        [name, surname, email, role, department, contracted_hours, is_active, userId]);
}
const updateByIdPassword = (newPassword, userId) => {
    return db.query('update users set password = ? where id =?',
        [newPassword, userId]);
}
//borrar usuario
const deleteId = (userId) => {
    return db.query('delete from users where id = ?', [userId])
}

module.exports = {
    selectUsersByProject,
    selectAll,
    selectById,
    selectByEmail,
    insert,
    getProjectsByUser,
    updateById,
    updateByIdPassword,
    deleteId,
}