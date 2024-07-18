
const selectAll = () => {
    return db.query('select * from users')
}

const SelectById = (userId) => {
    return db.query('select * from users where id = ?', [userId])
}

const insert = ({ name, surname, email, role, department, contracted_hours, is_active }) => {

    return db.query('insert into users (name, surname, email, role, department, contracted_hours, is_active )  values (?, ?, ?, ?, ?, ?, ?)',
        [name, surname, email, role, department, contracted_hours, is_active]);
}

module.exports = {
    selectAll,
    SelectById,
    insert,
}