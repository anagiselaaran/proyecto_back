const Time = require("../models/time.model");

const getAll = async (req, res, next) => {
    try {
        const [timeList] = await Time.selectAll();

        if (timeList.length === 0) {
            return res.status(404).json({ message: "No time logs available." });
        }

        res.json(timeList);
    } catch (error) {
        next(error);
    }
};

const getByUserId = async (req, res, next) => {
    const { userId } = req.params;

    try {
        const [timeList] = await Time.selectByUserId(userId);

        if (timeList.length === 0) {
            return res.status(404).json({ message: "No time logs available." });
        }

        res.json(timeList);
    } catch (error) {
        next(error);
    }
};

const getByDate = async (req, res, next) => {
    const { date } = req.params;

    try {
        const [timeList] = await Time.selectByDate(date);

        if (timeList.length === 0) {
            return res.status(404).json({ message: "No time logs available." });
        }

        res.json(timeList);
    } catch (error) {
        next(error);
    }
};

const getByUserIdAndDate = async (req, res, next) => {
    const { userId, date } = req.params;

    try {
        const [timeList] = await Time.selectByUserIdAndDate(userId, date);

        if (timeList.length === 0) {
            return res.status(404).json({ message: "No time logs available." });
        }

        res.json(timeList);
    } catch (error) {
        next(error);
    }
};

const getByPeriod = async (req, res, next) => {
    const { start, end } = req.params;
    try {
        const [timeList] = await Time.selectByPeriod(start, end);

        if (timeList.length === 0) {
            return res.status(404).json({ message: "No time logs available." });
        }

        res.json(timeList);
    } catch (error) {
        next(error);
    }
};

const getByUserIdAndPeriod = async (req, res, next) => {
    const { start, end, userId } = req.params;
    try {
        const [timeList] = await Time.selectByUserIdAndPeriod(userId, start, end);

        if (timeList.length === 0) {
            return res.status(404).json({ message: "No time logs available." });
        }

        res.json(timeList);
    } catch (error) {
        next(error);
    }
};

const createTime = async (req, res, next) => {
    try {
        const [time] = await Time.insertEntry(req.body);
        const [newInsert] = await Time.selectById(time.insertId);

        res.json(...newInsert);
    } catch (error) {
        next(error);
    }
};

const updateByUserIdAndDate = async (req, res, next) => {
    const { userId } = req.params;
    const { work_hours_ms, date } = req.body;

    try {
        // Update
        await Time.updateByUserIdAndDate(work_hours_ms, userId, date);
        // Get modified entry
        const [changedEntry] = await Time.selectByUserIdAndDate(userId, date);

        res.json(changedEntry);
    } catch (error) {
        next(error);
    }
};

const deleteByUserIdAndDate = async (req, res, next) => {
    const { userId, date } = req.params;
    try {
        const [timeList] = await Time.selectByUserIdAndDate(userId, date);
        await Time.removeByUserIdAndDate(userId, date);

        res.json({
            nr_of_entries_deleted: timeList.length,
            entries_deleted: timeList,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAll,
    getByUserId,
    getByDate,
    getByUserIdAndDate,
    getByPeriod,
    getByUserIdAndPeriod,
    createTime,
    updateByUserIdAndDate,
    deleteByUserIdAndDate,
};
