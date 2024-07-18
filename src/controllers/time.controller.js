const Time = require("../models/time.model");

const getByUserId = async (req, res, next) => {
    const userId = req.params.userId;

    try {
        const timeList = await Time.selectByUserId(userId);
        res.json(timeList);
    } catch (error) {
        next(error);
    }
};

const updateByUserIdAndDate = async (req, res, next) => {
    const userId = req.params.userId;
    const { workHours, date } = req.body;

    try {
        const time = await Time.updateByUserIdAndDate(userId, workHours, date);
        res.json(time);
    } catch (error) {
        next(error);
    }
};

const createTime = async (req, res, next) => {
    const userId = req.params.userId;
    const { workHours, date } = req.body;

    try {
        const time = await Time.insertEntry(userId, workHours, date);
        res.json(time);
    } catch (error) {
        next(error);
    }
};
module.exports = {
    getByUserId,
    createTime,
    updateByUserIdAndDate,
};
