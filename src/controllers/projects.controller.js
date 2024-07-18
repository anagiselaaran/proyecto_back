const Projects = require('../models/projects.model')




const getProjects = async (req, res) => {
    try {
        const projects = await Projects.selectAll();
        res.json(projects)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

const getById = async (req, res) => {
    const { projectId } = req.params;
    try {
        const [result] = await Projects.selectById(projectId)
        if (result.length === 0) {
            return res.status(404).json({message:'El proyecto no existe'})
        }
        res.json(result[0])
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

const getByDepartment = async (req, res) => {
    const { department } = req.params;
    try {
        const [result] = await Projects.selectByDepartment(department)
        res.json(result)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

const getByActive = async (req, res) => {
    const { active } = req.params;
    try {
        const [result] = await Projects.selectByActive(active)
        res.json(result)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const createProject = async (req, res) => {
  try {
      const [result] = await Projects.createProject(req.body);
      const [project] = await Projects.selectById(result.insertId);
      res.json(...project)
  } catch (error) {
      res.status(500).json({ message: error.message })
  }
   
}

const deleteProject = async (req, res) => {
    const { projectId } = req.params;
    try {
        const [project] = await Projects.selectById(projectId);
         await Projects.deleteProject(projectId);
        res.json(project);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}


module.exports = {
    getProjects, getById, getByDepartment, getByActive, createProject, deleteProject
}