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
    updateByUserIdAndDate,
    deleteByUserIdAndDate,
} = require("../../controllers/time.controller");

// Requests

// GET
router.get("/", getAll);
router.get("/user/:userId", getByUserId);
router.get("/date/:date", getByDate);
router.get("/user/:userId/date/:date", getByUserIdAndDate);
router.get("/start/:start/end/:end", getByPeriod);
router.get("/user/:userId/start/:start/end/:end", getByUserIdAndPeriod);

// POST
router.post("/new", createTime);

// PUT
router.put("/edit/user/:userId", updateByUserIdAndDate);

// DELETE
router.delete("/user/:userId/date/:date", deleteByUserIdAndDate);

module.exports = router;
