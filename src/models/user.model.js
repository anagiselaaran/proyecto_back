
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

const selectByName = (name) => {
    return db.query("select * from users WHERE name like ? ",["%"+name+"%"])
}
const selectByEmail = (email) => {
    return db.query('select * from users where email = ?', [email])
}
//crear un nuevo usuario en la base de datos
/* const insert = ({ name, surname, email, role, department, contracted_hours, is_active }) => {

    return db.query('insert into users (name, surname, email, role, department, contracted_hours, is_active )  values (?, ?, ?, ?, ?, ?, ?)',
        [name, surname, email, role, department, contracted_hours, is_active]);
} */
//prueba
const insert = ({ name, surname, email, password, role, department, contracted_hours }) => {
    return db.query('insert into users (name, surname, email, password, role, department, contracted_hours )  values ( ?, ?, ?, ?, ?, ?, ?)',
        [name, surname, email, password, role, department, contracted_hours]);
}

const selectByUserId = (userId) => {
    return db.query(`
        SELECT p.id, p.name, p.department, p.is_active, uhp.hours_by_project as "project_work_hours", uhp.date
        FROM projects as p, users_has_projects as uhp
        WHERE uhp.id_project = p.id AND uhp.id_user = ?
        ORDER BY p.name ASC, uhp.date ASC`,
        [userId]
    )
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
    selectByUserId,
    updateById,
    updateByIdPassword,
    deleteId,
    selectByName
}