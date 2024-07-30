const selectAll = () => {
    return db.query('select * from projects');
}

const selectById = (projectId) => {
    return db.query('select * from projects where id = ?', [projectId])
}

const selectByDepartment = (department) => {
    return db.query('select * from projects where department = ?', [department])
}
const selectByActive = (active) => {
    return db.query('select * from projects where is_active = ?', [active])
}

const selectProjectHours = id => {
    return db.query(
        `SELECT *
            FROM users_has_projects
                WHERE id = ?`,
        [id]
    );
};

const isRecordInDatabase = (id_project, id_user) => {
    return db.query(`
        SELECT * FROM users_has_projects
                WHERE id_project = ? AND id_user = ?`,
        [id_project, id_user])
}

const createProject = ({ name, limit_date, department, is_active }) => {
    return db.query('insert into projects(name,limit_date,department,is_active) values(?,?,?,?)', [name, limit_date, department, is_active]);
}

const deleteProject = (projectId) => {
    return db.query('delete from projects where id = ?', [projectId])
}

// TIMER PAGE - FILTER QUERIES
const selectByUserIdAndActive = (id_user, active) => {
    return db.query(
        `SELECT p.id, p.name, p.department, p.is_active, uhp.hours_by_project as "project_work_hours", uhp.date
            FROM projects as p, users_has_projects as uhp
            WHERE uhp.id_project = p.id AND uhp.id_user = ? AND p.is_active = ?
            ORDER BY p.name ASC, uhp.date ASC`,
        [id_user, active]
    );
}

const selectByUserIdAndDepartment = (id_user, department) => {
    return db.query(
        `SELECT p.id, p.name, p.department, p.is_active, uhp.hours_by_project as "project_work_hours", uhp.date
            FROM projects as p, users_has_projects as uhp
            WHERE uhp.id_project = p.id AND uhp.id_user = ? AND p.department = ?
            ORDER BY p.name ASC, uhp.date ASC`,
        [id_user, department]
    );
}


module.exports = {
    selectAll, selectById, selectByDepartment, selectByActive, createProject, deleteProject, selectByUserIdAndActive, selectByUserIdAndDepartment, isRecordInDatabase, selectProjectHours
}
