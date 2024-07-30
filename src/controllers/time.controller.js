const Time = require("../models/time.model");
const Projects = require("../models/projects.model");
const getAll = async (req, res, next) => {
    try {
        const [timeList] = await Time.selectAll();


        res.json(timeList);
    } catch (error) {
        next(error);
    }
};

const getByUserId = async (req, res, next) => {
    try {
        const [timeList] = await Time.selectByUserId(req.user.id);

        res.json(timeList);
    } catch (error) {
        next(error);
    }
};

const getByDate = async (req, res, next) => {
    const { date } = req.params;

    try {
        const [timeList] = await Time.selectByDate(date);

        res.json(timeList);
    } catch (error) {
        next(error);
    }
};

const getByUserIdAndDate = async (req, res, next) => {
    const { date } = req.params;

    try {
        const [timeList] = await Time.selectByUserIdAndDate(req.user.id, date);

        res.json(timeList);
    } catch (error) {
        next(error);
    }
};

const getByPeriod = async (req, res, next) => {
    const { start, end } = req.params;
    try {
        const [timeList] = await Time.selectByPeriod(start, end);

        res.json(timeList);
    } catch (error) {
        next(error);
    }
};

const getByUserIdAndPeriod = async (req, res, next) => {
    const { start, end, userId } = req.params;
    try {
        const [timeList] = await Time.selectByUserIdAndPeriod(userId, start, end);

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

const createProjectTime = async (req, res, next) => {
    const [projectInDB] = await Projects.isRecordInDatabase(req.body.id_project, req.body.id_user);
    try {
        if (projectInDB.length === 0) {
            const [time] = await Time.insertProjectEntry(req.body);
            const [newInsert] = await Projects.selectProjectHours(time.insertId);

            res.json(newInsert);
            return;
        }
        
        const totalHours = projectInDB[0].hours_by_project + req.body.hours_by_project;
        await Time.updateProjectEntry(totalHours, projectInDB[0].id);
        const [newInsert] = await Projects.selectProjectHours(projectInDB[0].id);

        res.json(newInsert);
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
    const { date } = req.params;
    const { userId } = req.params;
    console.log(req.user);
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
    createProjectTime,
    updateByUserIdAndDate,
    deleteByUserIdAndDate,
};
