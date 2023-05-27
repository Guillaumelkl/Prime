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
    console.log(id)
    res.status(200).send({msg:"comment added"})
  } catch (error) {
    res.send(error);
  }
};


const getAllQuestions = async (req, res) => {
  try {
    const questions = await questionModel.find();
    res.json(questions);
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
    console.log(toDelete);
    console.log(id)
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














// const getComments = async (req, res) => {
//   try {
//     const comments = await CommentModel.find().populate('responses');
//     res.send(comments);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Server error');
//   }
// };


// const getUsername = async (req, res) => {
//   try {
//     const {userName} = req.body;
    
//     const user = await User.findOne( userName );
//     console.log(user)

//     if (!user) {
//       return res.status(404).send({ error: 'User not found' });
//     }
    
//     const foundUserName = user.userName;
//     console.log(foundUserName);
//     res.send({foundUserName});
//   } catch (error) {
//     res.status(500).send(error);
//   }
// };






// const createComment = async (req, res) => {
//   const { text,userName, parent } = req.body;
  
//   console.log(userName)

//   try {
//     const comment = new CommentModel({ 
//       text: text, 
//       userName: userName,
//     });

//     if (parent) {
//       const parentComment = await CommentModel.findById(parent);
//       if (!parentComment) {
//         return res.status(404).send({ msg: 'Parent comment not found' });
//       }
//       parentComment.responses.push(comment);
//       await parentComment.save();
//     }

//     await comment.save();
//     res.send(comment);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Server error');
//   }
// };






// const updateComment = async (req, res) => {
//   const { id } = req.params;
//   const { text } = req.body;
//   try {
//     const comment = await CommentModel.findByIdAndUpdate(id, { text }, { new: true });
//     if (!comment) {
//       return res.status(404).send({ msg: 'Comment not found' });
//     }
//     res.send(comment);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Server error');
//   }
// };

// // const deleteComment = async (req, res) => {
// //   const { id } = req.params;
  
// //   try {
// //     const comment = await CommentModel.findByIdAndDelete(id);
// //     if (!comment) {
// //       return res.status(404).send({ msg: 'Comment not found' });
// //     }
// //     res.send({ msg: 'Comment deleted' });
// //   } catch (err) {
// //     console.error(err);
// //     res.status(500).send('Server error');
// //   }
// // };

// const deleteComment = async (req, res) => {
//   const { id } = req.params;
//   const userId = req.user.userId;

//   try {
//     const comment = await CommentModel.findById(id);
//     if (!comment) {
//       return res.status(404).send({ msg: 'Comment not found' });
//     }

    
//     if (comment.userId !== userId) {
//       return res.status(401).send({ msg: 'Unauthorized' });
//     }

//     await CommentModel.findByIdAndDelete(id);
//     res.send({ msg: 'Comment deleted' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Server error');
//   }
// };

// module.exports = {
//   getComments,
//   createComment,
//   updateComment,
//   deleteComment,
//   getUsername
// };







// const questionModel = require('../Models/QuestionModel');
// const User = require('../Models/loginModel');

// const createQuestion = async (req, res) => {
//   try {
//     const { title, text } = req.body;
//     const userId = req.userId;

//     if (!title || !text) {
//       return res.status(400).send({ error: 'Title and text are required fields.' });
//     }

//     const question = await questionModel.create({
//       title,
//       text,
//       userId,
//       comments: []
//     });

//     res.status(200).send({ msg: 'Question has been saved successfully.', question });
//   } catch (error) {
//     console.log('Error creating question:', error);
//     res.status(500).send({ message: 'Failed to create question', message: error.message });
//   }
// };

// const getAllQuestions = async (req, res) => {
//   try {
//     const questions = await questionModel.find();
//     res.json(questions);
//   } catch (error) {
//     res.status(500).send({ message: 'Failed to fetch questions' });
//   }
// };

// const updateQuestionById = async (req, res) => {
//   try {
//     const { text, userId } = req.body;
//     const questionId = req.params.id;

//     const question = await questionModel.findById(questionId);
//     if (!question) {
//       return res.status(404).send({ message: 'Question not found' });
//     }

//     question.text = text;
//     question.userId = userId;

//     const updatedQuestion = await question.save();
//     res.send(updatedQuestion);
//   } catch (error) {
//     res.status(500).send({ message: 'Failed to update question' });
//   }
// };

// const deleteQuestionById = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const deletedQuestion = await questionModel.findByIdAndRemove(id);

//     if (!deletedQuestion) {
//       return res.status(404).send({ error: 'Question not found' });
//     }

//     res.send({ message: 'Question deleted successfully', deletedQuestion });
//   } catch (error) {
//     res.status(500).send({ message: 'Failed to delete question' });
//     console.log(error);
//   }
// };

// module.exports = {
//   createQuestion,
//   getAllQuestions,
//   updateQuestionById,
//   deleteQuestionById
// };

