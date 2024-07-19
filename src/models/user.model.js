
const selectAll = () => {
    return db.query('select * from users')
}

const SelectById = (userId) => {
    return db.query('select * from users where id = ?', [userId])
}

/* const insert = ({ name, surname, email, role, department, contracted_hours, is_active }) => {

    return db.query('insert into users (name, surname, email, role, department, contracted_hours, is_active )  values (?, ?, ?, ?, ?, ?, ?)',
        [name, surname, email, role, department, contracted_hours, is_active]);
} */
//prueba
const insert = ({ name, surname, email, password, department, contracted_hours }) => {

    return db.query('insert into users (name, surname, email, password, department, contracted_hours )  values (?, ?, ?, ?, ?, ?)',
        [name, surname, email, password, department, contracted_hours]);
}


const updateById = (userId, { name, surname, email, role, department, contracted_hours, is_active }) => {
    return db.query('update users set name = ?, surname = ?, email = ?, role = ?, department = ?, contracted_hours =?, is_active = ? where id =?',
        [name, surname, email, role, department, contracted_hours, is_active, userId]);
}

module.exports = {
    selectAll,
    SelectById,
    insert,
    updateById
}