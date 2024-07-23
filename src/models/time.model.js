const selectAll = () => {
    return db.query(
        `SELECT *
            FROM time`
    );
};

const selectById = id => {
    return db.query(
        `SELECT *
            FROM time
                WHERE id = ?`,
        [id]
    );
};

const selectByUserId = id_user => {
    return db.query(
        `SELECT *
            FROM time
                WHERE id_user = ?`,
        [id_user]
    );
};

const selectByDate = date => {
    return db.query(
        `SELECT *
            FROM time
                WHERE date = ?`,
        [date]
    );
};

const selectByUserIdAndDate = (id_user, date) => {
    return db.query(
        `SELECT *
            FROM time
                WHERE id_user = ? AND date = ?`,
        [id_user, date]
    );
};

const selectByPeriod = (start, end) => {
    return db.query(
        `SELECT *
            FROM time
                WHERE date BETWEEN ? AND ?`,
        [start, end]
    );
};

const selectByUserIdAndPeriod = (id_user, start, end) => {
    return db.query(
        `SELECT *
            FROM time
                WHERE id_user = ? AND date BETWEEN ? AND ?`,
        [id_user, start, end]
    );
};

const insertEntry = ({ work_hours_ms, date, id_user }) => {
    return db.query(
        `INSERT INTO time (work_hours_ms, date, id_user)
            VALUES (?, ?, ?)`,
        [work_hours_ms, date, id_user]
    );
};

const updateByUserIdAndDate = (work_hours_ms, id_user, date) => {
    return db.query(
        `UPDATE time SET work_hours_ms = ?
            WHERE id_user = ? AND date = ?`,
        [work_hours_ms, id_user, date]
    );
};

const removeByUserIdAndDate = (id_user, date) => {
    return db.query(
        `DELETE FROM time
            WHERE id_user = ? AND date = ?`,
        [id_user, date]
    );
};

module.exports = {
    selectAll,
    selectById,
    selectByUserId,
    selectByUserIdAndDate,
    selectByDate,
    selectByPeriod,
    selectByUserIdAndPeriod,
    insertEntry,
    updateByUserIdAndDate,
    removeByUserIdAndDate,
};
