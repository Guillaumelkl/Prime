const express = require("express");
const router = express.Router();
const authorize = require("../authorize")



const {postProject,
       getProjects,
       deleteProject
      }  = require("../Controllers/postProjectControllers");



router.post("/postProject",authorize,  postProject);
router.get("/getProjects", authorize, getProjects);
router.delete("/delete/:id",authorize, deleteProject);

module.exports = router;

