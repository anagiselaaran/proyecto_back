const selectByUserId = userId => {
    return db.query(
        `SELECT *
            FROM time
                WHERE id_user = ?`,
        [userId]
    );
};

const selectByDay = (userId, day) => {
    return db.query(
        `SELECT *
            FROM time
                WHERE id_user = ? AND date = ?`,
        [userId, day]
    );
};

// const selectByMonth = (userId, month) => {
//     return db.query(
//         `SELECT *
//             FROM time
//                 WHERE id_user = ? AND date = ?`,
//         [userId, month]);
// };

const selectByPeriod = (userId, start, end) => {
    return db.query(
        `SELECT *
            FROM time
                WHERE id_user = ? AND date BETWEEN ? AND ?`,
        [userId, start, end]
    );
};

const insertEntry = (userId, workHours, date) => {
    return db.query(
        `INSERT INTO time (id_user, work_hours_ms, date)
            VALUES (?, ?, ?)`,
        [userId, workHours, date]
    );
};

const updateByUserIdAndDate = (userId, workHours, date) => {
    return db.query(
        `UPDATE time SET id_user = ?, work_hours_ms = ?, date = ?
            WHERE id_user = ? AND date = ?`,
        [workHours, userId, date]
    );
};

const deleteById = userId => {
    return db.query(
        `DELETE FROM time
            WHERE id_user = ?`,
        [userId]
    );
};

module.exports = {
    selectByUserId,
    selectByDay,
    // selectByMonth,
    selectByPeriod,
    insertEntry,
    updateByUserIdAndDate,
    deleteById,
};
