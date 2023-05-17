const projectPost = require('../Models/projectPostModel');
const mongoose = require('mongoose');

const postProject =  async (req,res) => {
    const {title, technology, summary} = req.body;

    try {
        await projectPost.create({
            title,
            technology,
            summary
        });
        res.status(200).send({msg:"project has been saved successfully."});
        
    } catch (error) {
        res.status(500).send({msg:"cannot post project"});
             console.log('error',error)
    };
}


const getProjects = async (req, res) => {
  try {
    let { id } = req.params;
      const projects =  await projectPost.find(id);
      res.send(projects);
      
  } catch (error) {
      res.status(500).send({msg:'unable to get projects', error});
        
  }
}

  

const deleteProject = async (req, res) => {
    try {
      let { id } = req.params;
      const toDelete = await projectPost.findByIdAndRemove(id);
      res.status(204).send({ msg: 'Project deleted', toDelete });
      console.log(toDelete);
    } catch (error) {
      res.status(500).send({ msg: 'Unable to delete project', error });
      console.log(error);
    }
  }
  

module.exports = {
    postProject,
    getProjects,
    deleteProject
}