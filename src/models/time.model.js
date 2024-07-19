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

const selectByDay = date => {
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

const selectByPeriod = (id_user, start, end) => {
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

const deleteById = id_user => {
    return db.query(
        `DELETE FROM time
            WHERE id_user = ?`,
        [id_user]
    );
};

module.exports = {
    selectById,
    selectByUserId,
    selectByUserIdAndDate,
    selectByDay,
    selectByPeriod,
    insertEntry,
    updateByUserIdAndDate,
    deleteById,
};
