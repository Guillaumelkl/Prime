const projectPost = require('../Models/projectPostModel');




const postProject = async (req, res) => {
  const { title, technology, summary,URL } = req.body;
  const userId = req.user.userId;
  

  try {
    await projectPost.create({
      title: title,
      technology: technology,
      summary: summary,
      createdBy: userId,
      userId: userId,
      URL: URL 
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
    
    const projects = await projectPost.find({ userId });
    res.send(projects);
    
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

  const editProject = async (req, res) => {
    const { title, technology, summary, URL } = req.body;
    const { id } = req.params;
  
    try {
      const project = await projectPost.findByIdAndUpdate(id, {
        title: title,
        technology: technology,
        summary: summary,
        URL: URL
      });
  
      if (!project) {
        return res.status(404).send({ error: 'Project not found' });
      }
  
      res.status(200).send({ msg: 'Project has been updated successfully.' });
    } catch (error) {
      res.status(500).send({ error: 'Failed to update project' });
    }
  };
  

module.exports = {
    postProject,
    getProjects,
    deleteProject,
    editProject
}