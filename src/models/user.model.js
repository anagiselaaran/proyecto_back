
//seleccionar todos los usuarios
const selectAll = () => {
    return db.query('select * from users')
}
//seleccionar usuario por id
const selectById = (userId) => {
    return db.query('select * from users where id = ?', [userId])
}
const selectByEmail = (email) => {
    return db.query('select * from users where email = ?',[email])
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
        SELECT p.id, p.name, uhp.hours_by_project as "project_work_hours", uhp.date as "start_date"
        FROM projects as p, users_has_projects as uhp
        WHERE uhp.id_project = p.id AND uhp.id_user = ?`, [userId]
    )
    // TODO: Talk to Luis about this query, column names and function name (Corrected, had a typo on hours_by_project)

}

//actualizar usuario
const updateById = (userId, { name, surname, email, role, department, contracted_hours, is_active }) => {
    return db.query('update users set name = ?, surname = ?, email = ?, role = ?, department = ?, contracted_hours =?, is_active = ? where id =?',
        [name, surname, email, role, department, contracted_hours, is_active, userId]);
}
const updateByIdPassword = ( newPassword, userId) => {
    return db.query('update users set password = ? where id =?',
        [newPassword, userId]);
}
//borrar usuario
const deleteId = (userId) => {
    return db.query('delete from users where id = ?', [userId])
}

module.exports = {
    selectAll,
    selectById,
    selectByEmail,
    insert,
    selectByUserId,
    updateById,
    updateByIdPassword,
    deleteId
}