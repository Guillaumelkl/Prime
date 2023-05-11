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

router.post("/postProject", postProject );
router.get("/getProjects", getProjects)
router.delete("/deleteProject", authorize, deleteProject)


router.post("/myPost", authorize, myPost );
router.put("/updatePost", authorize, authorize, updatePost );
router.delete("/deletePost", authorize, deletePost)



module.exports = router;

