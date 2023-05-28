const questionModel = require('../Models/QuestionModel');
const User = require("../Models/loginModel")


const createQuestion = async (req, res) => {
  try {
    const { title, text, comments } = req.body;
    const userId = req.user;

    await questionModel.create({
      title,
      text,
      userId,
      comments,
    });

    res.status(200).send({ msg: 'Project has been saved successfully.' });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: 'Failed to create question', message: error.message });
  }
};


const comments = async (req, res) => {
  const id = req.params.id;
  try {
    await questionModel.updateOne({ _id: id }, { $push: { comments: req.body } });
    res.status(200).send({msg:"comment added"})
  } catch (error) {
    res.send(error);
  }
};


const getAllQuestions = async (req, res) => {
  try {
    const questions = await questionModel.find();
    res.send(questions);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch questions' });
  }
};




const updateQuestionById = async (req, res) => {
  try {
    const { text, userName, userId } = req.body;
    const question = await questionModel.findById(req.params.id);
    if (!question) {
      return res.status(404).json({ error: 'Question not found' });
    }
    question.text = text;
    question.userName = userName;
    question.userId = userId;
    const updatedQuestion = await question.save();
    res.send(updatedQuestion);
  } catch (error) {
    res.status(500).send({ error: 'Failed to update question' });
  }
};



const deleteQuestionById = async (req, res) => {
  try {
    const  {id}  = req.params;
    const toDelete = await questionModel.findByIdAndDelete(id);
    res.send({ message: 'Question deleted successfully', toDelete });
  } catch (error) {
    res.status(500).send({ error: 'Failed to delete question' });
    console.log(error)
  }
};



module.exports = {
  createQuestion,
  getAllQuestions,
  comments,
  deleteQuestionById
};


