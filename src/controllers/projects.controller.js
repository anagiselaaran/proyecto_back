const Projects = require("../models/projects.model");

const getProjects = async (req, res, next) => {
    try {
        const [projects] = await Projects.selectAll();
        res.json(projects);
    } catch (error) {
        next(error);
    }
};

const getById = async (req, res, next) => {
    const { projectId } = req.params;
    try {
        const [result] = await Projects.selectById(projectId);
        if (result.length === 0) {
            return res.status(404).json({ message: "El proyecto no existe" });
        }
        res.json(result[0]);
    } catch (error) {
        next(error);
    }
};

const getByDepartment = async (req, res, next) => {
    const { department } = req.params;
    try {
        const [result] = await Projects.selectByDepartment(department);
        res.json(result);
    } catch (error) {
        next(error);
    }
};

const getByActive = async (req, res, next) => {
    const { active } = req.params;
    try {
        const [result] = await Projects.selectByActive(active);
        res.json(result);
    } catch (error) {
        next(error);
    }
};

const createProject = async (req, res, next) => {
    try {
        const [result] = await Projects.createProject(req.body);
        const [project] = await Projects.selectById(result.insertId);
        res.json(...project);
    } catch (error) {
        next(error);
    }
};

const deleteProject = async (req, res, next) => {
    const { projectId } = req.params;
    try {
        const [project] = await Projects.selectById(projectId);
        await Projects.deleteProject(projectId);
        res.json(project);
    } catch (error) {
        next(error);
    }
};

// TIMER PAGE - FILTER METHODS
const getByUserIdAndActive = async (req, res, next) => {
    const id_user = req.user.id;
    const { active } = req.params;

    try {
        const [result] = await Projects.selectByUserIdAndActive(id_user, active);
        res.json(result);
    } catch (error) {
        next(error);
    }
};

const getByUserIdAndDepartment = async (req, res, next) => {
    const id_user = req.user.id;
    console.log(req.body);
    const { department } = req.params;
    try {
        const [result] = await Projects.selectByUserIdAndDepartment(id_user, department);
        console.log(result);
        res.json(result);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getProjects,
    getById,
    getByDepartment,
    getByActive,
    createProject,
    deleteProject,
    getByUserIdAndActive,
    getByUserIdAndDepartment,
};
