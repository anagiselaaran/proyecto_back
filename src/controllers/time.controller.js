const Time = require("../models/time.model");

const getByUserId = async (req, res, next) => {
    const userId = req.params.userId;

    try {
        const timeList = await Time.selectByUserId(userId);
        console.log(timeList);
        res.json(timeList);
    } catch (error) {
        next(error);
    }
};

const getByDay = async (req, res, next) => {
    const { userId, day } = req.params;

    try {
        const timeList = await Time.selectByDay(userId, day);
        console.log(timeList);
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
        console.log(time);
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
        console.log(time);
        res.json(time);
    } catch (error) {
        next(error);
    }
};
module.exports = {
    getByUserId,
    getByDay,
    createTime,
    updateByUserIdAndDate,
};
