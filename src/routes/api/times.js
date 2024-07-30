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
const { checkToken } = require("../../utils/middlewares");

// Requests

// GET
// TODO: Change all routes that require userId to use req.user.id
router.get("/", checkToken, getAll);
router.get("/user/:userId", checkToken, getByUserId);
router.get("/date/:date", checkToken, getByDate);
router.get("/user/:userId/date/:date", checkToken, getByUserIdAndDate);
router.get("/start/:start/end/:end", checkToken, getByPeriod);
router.get("/user/:userId/start/:start/end/:end", checkToken, getByUserIdAndPeriod);

// POST
router.post("/new", checkToken, createTime);
router.post("/project/new", checkToken, createProjectTime);

// PUT
router.put("/edit/user/:userId", checkToken, updateByUserIdAndDate);

// DELETE
router.delete("/user/:userId/date/:date", checkToken, deleteByUserIdAndDate);

module.exports = router;
