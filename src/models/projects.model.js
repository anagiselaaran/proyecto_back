const selectAll = () => {
    return db.query('select * from projects');
}


module.exports = {
    selectAll
}