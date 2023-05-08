const projectPostModel = require('../Models/projectPostModel');
const mongoose = require('mongoose');

const postProject =  async (req,res) => {
    const {title, technology, summary} = req.body;

    try {
        await projectPostModel.create({
            title,
            technology,
            summary
        });
        res.status(202).send("project has been saved successfully.")
        
    } catch (error) {
        res.status(500).send({msg:"cannot post project"});
        throw error;
        
    }
}


const getProjects = async (req, res) => {
    try {
        const projects =  await projectPostModel.find();
        res.send(projects);
        
    } catch (error) {
        res.status(500).send({msg:'unable to get projects', error});
          
    }
}

const deleteProject =  async(req, res)=> {
    try {
        let {id} = req.params;
        const toDelete = await projectPostModel.findByIdAndRemove(id);
        res.status(204).send({msg: `${project.title} deleted`, toDelete});
        
    } catch (error) {
        res.status(500).send({msg:"unable to delete project",error});
        
    }
}

module.exports = {
    postProject,
    getProjects,
    deleteProject
}