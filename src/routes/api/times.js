// External imports
const router = require("express").Router();
// Internal imports
const {
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
} = require("../../controllers/time.controller");

// Requests

// GET
// TODO: Change all routes that require userId to use req.user.id
router.get("/", getAll);
router.get("/user/:userId", getByUserId);
router.get("/date/:date", getByDate);
router.get("/user/:userId/date/:date", getByUserIdAndDate);
router.get("/start/:start/end/:end", getByPeriod);
router.get("/user/:userId/start/:start/end/:end", getByUserIdAndPeriod);

// POST
router.post("/new", createTime);
router.post("/project/new", createProjectTime);

// PUT
router.put("/edit/user/:userId", updateByUserIdAndDate);

// DELETE
router.delete("/user/:userId/date/:date", deleteByUserIdAndDate);

module.exports = router;
