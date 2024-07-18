// External imports
const router = require("express").Router();
// Internal imports
const { getByUserId, createTime,  } = require("../../controllers/time.controller");

// Requests

// GET
router.get("/:userId", getByUserId);

// POST
router.post("/new", createTime);

// PUT

// DELETE

module.exports = router;