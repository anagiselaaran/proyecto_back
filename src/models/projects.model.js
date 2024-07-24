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

const createProject = ({ name, limit_date, department, created_at, is_active }) => {
    return db.query('insert into projects(name,limit_date,department,created_at,is_active) values(?,?,?,?,?)', [name, limit_date, department, created_at, is_active]);
}

const deleteProject = (projectId) => {
    return db.query('delete from projects where id = ?', [projectId])
}


module.exports = {
    selectAll, selectById, selectByDepartment, selectByActive, createProject, deleteProject
}
