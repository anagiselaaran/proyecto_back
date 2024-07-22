
//seleccionar todos los usuarios
const selectAll = () => {
    return db.query('select * from users')
}
//seleccionar usuario por id
const SelectById = (userId) => {
    return db.query('select * from users where id = ?', [userId])
}
//crear un nnuevo usuario en la base de datos
const insert = ({ name, surname, email, role, department, contracted_hours, is_active }) => {

    return db.query('insert into users (name, surname, email, role, department, contracted_hours, is_active )  values (?, ?, ?, ?, ?, ?, ?)',
        [name, surname, email, role, department, contracted_hours, is_active]);
}
//prueba
/* const insert = ({ name, surname, email, password, role, department, contracted_hours, is_active }) => {

    return db.query('insert into users (name, surname, email, password, role, department, contracted_hours, is_active )  values (?, ?, ?, ?, ?, ?, ?, ?)',
        [name, surname, email, password, role, department, contracted_hours, is_active]);
} */

//actualizar usuario
const updateById = (userId, { name, surname, email, role, department, contracted_hours, is_active }) => {
    return db.query('update users set name = ?, surname = ?, email = ?, role = ?, department = ?, contracted_hours =?, is_active = ? where id =?',
        [name, surname, email, role, department, contracted_hours, is_active, userId]);
}
//borrar usuario
const deleteId = (userId) => {
    return db.query('delete from users where id = ?', [userId])
}

module.exports = {
    selectAll,
    SelectById,
    insert,
    updateById,
    deleteId
}