// External imports
const router = require("express").Router();

// Requests

// GET
router.get("/", getProjects);
router.get("/:ProjectId", getById);
router.get("/user-projects/:userId", getByUserId);
// router.get("/email/:email", getByEmail );



// POST
router.post("/new",  createProject);

// PUT
router.put("/edit/:projectId", updateProject);

// DELETE
router.delete("/:projectId", deleteProject);

module.exports = router;