const Time = require("../models/time.model");

const getByUserId = async (req, res, next) => {
    const { userId } = req.params;

    try {
        const [timeList] = await Time.selectByUserId(userId);

        if (timeList.length === 0) {
            return res.status(404).json({ message: "Entry not found" });
        }

        res.json(...timeList);
    } catch (error) {
        next(error);
    }
};

const getByDay = async (req, res, next) => {
    const { date } = req.params;

    try {
        const [timeList] = await Time.selectByDay(date);

        if (timeList.length === 0) {
            return res.status(404).json({ message: "Entry not found" });
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
            return res.status(404).json({ message: "Entry not found" });
        }

        res.json(timeList);
    } catch (error) {
        next(error);
    }
};

const updateByUserIdAndDate = async (req, res, next) => {
    const { userId, date } = req.params;
    const { work_hours_ms } = req.body;

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

const createTime = async (req, res, next) => {
    try {
        const [time] = await Time.insertEntry(req.body);
        const [newInsert] = await Time.selectById(time.insertId);

        res.json(...newInsert);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getByUserId,
    getByDay,
    getByUserIdAndDate,
    createTime,
    updateByUserIdAndDate,
};
