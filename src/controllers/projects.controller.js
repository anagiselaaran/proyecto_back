const Projects = require('../models/projects.model')




const getProjects = async (req, res) => {
    try {
        const projects = await Projects.selectAll();
        res.json(projects)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}



module.exports = {
    getProjects
}