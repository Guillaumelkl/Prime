const questionModel = require('../Models/QuestionModel');
const User = require("../Models/registerModel")


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
    res.status(500).send({ error: 'Failed to create question', message: error.message });
    return(error);
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




const deleteQuestionById = async (req, res) => {
  try {
    const  {id}  = req.params;
    const toDelete = await questionModel.findByIdAndDelete(id);
    res.send({ message: 'Question deleted successfully', toDelete });
  } catch (error) {
    res.status(500).send({ error: 'Failed to delete question' });
    return (error)
  }
};






module.exports = {
  createQuestion,
  getAllQuestions,
  comments,
  deleteQuestionById,
};


