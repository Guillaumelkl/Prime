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
      comments,
      deleteQuestionById,
      getUsername
      } = require("../Controllers/QuestionController")


router.post("/postProject",verifyToken,  postProject);
router.get("/getProjects", verifyToken, getProjects);
router.delete("/delete/:id",verifyToken, deleteProject);
router.put("/editProject/:id", editProject)



router.get('/getQuestion',verifyToken, getAllQuestions);
router.post('/addQuestion', createQuestion);
router.post('/comments/:id', comments);
router.delete('/deleteQuestion/:id', deleteQuestionById);
router.get('/getUser/:id', getUsername)


module.exports = router;

