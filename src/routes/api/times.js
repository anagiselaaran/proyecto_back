// External imports
const router = require("express").Router();
// Internal imports
const {
    getByUserId,
    getByUserIdAndDate,
    createTime,
    updateByUserIdAndDate,
    getByDay,
} = require("../../controllers/time.controller");

// Requests

// GET
router.get("/:userId", getByUserId);
router.get("/day/:date", getByDay);
router.get("/date/:date/user/:userId", getByUserIdAndDate);
// POST
router.post("/new", createTime);

// PUT
router.put("/edit/:userId/:date", updateByUserIdAndDate);

// DELETE

module.exports = router;
