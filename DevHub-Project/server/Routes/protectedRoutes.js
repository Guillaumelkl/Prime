const express = require("express");
const router = express.Router();
const verifyToken = require("../authorize")

const getProfile = require("../Controllers/profile")

const {postProject,
       getProjects,
       deleteProject,
       editProject
      }  = require("../Controllers/postProjectControllers");

const {
      createQuestion,
      getAllQuestions,
      comments,
      } = require("../Controllers/QuestionController")

router.get("/getProfile/:id", getProfile);

router.post("/postProject",verifyToken,  postProject);
router.get("/getProjects", verifyToken, getProjects);
router.delete("/delete/:id",verifyToken, deleteProject);
router.put("/editProject/:id",verifyToken, editProject)



router.get('/getQuestion',verifyToken, getAllQuestions);
router.post('/addQuestion', createQuestion);
router.post('/comments/:id', comments);




module.exports = router;

