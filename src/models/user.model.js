
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

const getHoursByProject = (userId, projectId) => {
    return db.query('select * from users_has_projects where id_user = ? and id_project = ?', [userId, projectId]);
}
const getProjectsByUser = (userId) => {
    return db.query('select projects.id, projects.name, projects.is_active, users_has_projects.hours_by_project, projects.limit_date , users_has_projects.date from users_has_projects join projects ON users_has_projects.id_project = projects.id where users_has_projects.id_user = ?', [userId]);
}

/* const weeklyTotals = () => {
    return db.query('SELECT id_user, YEAR(date) AS year, WEEK(date, 1) AS week, SUM(work_hours_ms) / 3600000 AS total_weekly_hours FROM time GROUP BY id_user, year, week')
}
const dailyDetails = () => {
    console.log('aqui2')
    return db.query('  SELECT id_user, YEAR(date) AS year, MONTH(date) AS month, DAY(date) AS day, (DAYOFWEEK(date) + 5) % 7 + 1 AS day_of_week, WEEK(date, 1) AS week,  SUM(work_hours_ms) / 3600000 AS total_daily_hours FROM  time GROUP BY id_user,year,month,day,day_of_week,week')
} */
const getHoursWeekly = (userId, date) => {
    console.log('aqui3 model', userId, date)
    return db.query('SELECT users.id, DATE_ADD( ? , INTERVAL -WEEKDAY(?) DAY) AS week_start_date, SUM(time.work_hours_ms / 3600000) AS total_hours_weekly FROM users JOIN time ON users.id = time.id_user WHERE users.id = ? AND time.date BETWEEN DATE_ADD(?, INTERVAL -WEEKDAY( ? ) DAY) AND DATE_ADD(?, INTERVAL (6 - WEEKDAY(?)) DAY) GROUP BY users.id, users.name, DATE_ADD( ? , INTERVAL -WEEKDAY(?) DAY) ORDER BY week_start_date', [date, date, userId, date, date, date, date, date, date]);
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
//asignar horas a proyecto
const updateHoursOfProject = (userId, projectId, hours) => {
    return db.query(`UPDATE users_has_projects
        SET hours_by_project = hours_by_project + ?
        WHERE id_user = ? AND id_project = ?`,
        [hours, userId, projectId]);
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
    getHoursByProject,
    getHoursWeekly,
    insert,
    selectByUserId,
    getProjectsByUser,
    updateById,
    updateByIdPassword,
    selectByName,
    updateHoursOfProject,
    deleteId
}