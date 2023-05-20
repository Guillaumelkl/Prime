const getProject = require('../Controllers/postProjectControllers')

function scopedProjects(projects, user) {
    return projects.filter(projects => projects.userId === user.id);
  }
  
  module.exports = scopedProjects;
  