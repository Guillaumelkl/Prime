const express = require("express");
const router = express.Router();
const authorize = require("../authorize")

const {postProject,
       getProjects,
       deleteProject
      }  = require("../Controllers/postProjectControllers");

const {myPost,
       updatePost,
       deletePost
} = require("../Controllers/postCommentController")

router.post("/postProject",authorize, postProject );
router.post("/getProjects", getProjects)
router.delete("/deleteProject", deleteProject)


router.post("/myPost", authorize, myPost );
router.put("/updatePost", authorize, updatePost );
router.delete("/deletePost", authorize, deletePost)



module.exports = router;

