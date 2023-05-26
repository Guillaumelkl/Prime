const express = require("express");
const router = express.Router();
const verifyToken = require("../authorize")



const {postProject,
       getProjects,
       deleteProject,
       editProject
      }  = require("../Controllers/postProjectControllers");

const {
      createQuestion,
      getAllQuestions,
      updateQuestionById,
      deleteQuestionById
      } = require("../Controllers/QuestionController")


router.post("/postProject",verifyToken,  postProject);
router.get("/getProjects", verifyToken, getProjects);
router.delete("/delete/:id",verifyToken, deleteProject);
router.put("/editProject/:id", editProject)



router.get('/getQuestion',verifyToken, getAllQuestions);
router.post('/addQuestion',  createQuestion);
router.put('/editQuestion/:id', updateQuestionById);
router.delete('/deleteQuestion/:id', deleteQuestionById);

module.exports = router;

