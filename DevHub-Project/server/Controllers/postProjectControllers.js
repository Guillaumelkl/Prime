const projectPost = require('../Models/projectPostModel');
const User = require('../Models/loginModel');
const mongoose = require('mongoose');



const postProject = async (req, res) => {
  const { title, technology, summary } = req.body;
  const userId = req.user.userId;
  console.log(userId);

  try {
    await projectPost.create({
      title: title,
      technology: technology,
      summary: summary,
      createdBy: userId, // Assign the userId to the createdBy field
      userId: userId, // Assign the userId to the userId field
    });

    res.status(200).send({ msg: 'Project has been saved successfully.' });
  } catch (error) {
    res.status(500).send({ msg: 'Cannot post project', error });
    console.log('error', error);
  }
};



const getProjects = async (req, res) => {
  try {
    // Verify the token before getting the projects
    if (!req.user || !req.user.userId) {
      return res.status(401).send({ msg: 'Unauthorized' });
    }

    const userId = req.user.userId;
    console.log(userId);
    const projects = await projectPost.find({ userId });
    res.send(projects);
    console.log(projects);
  } catch (error) {
    res.status(500).send({ msg: 'Unable to get projects', error });
  }
};

 

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