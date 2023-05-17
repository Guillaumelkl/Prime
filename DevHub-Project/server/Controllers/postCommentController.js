const CommentModel = require('../Models/commentModel');
const User = require("../Models/registerModel")


const getComments = async (req, res) => {
  try {
    const comments = await CommentModel.find().populate('responses');
    res.send(comments);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

const createComment = async (req, res) => {
  const { text, author, parent } = req.body;
  try {
    const comment = new CommentModel({ text, author });
    if (parent) {
      const parentComment = await CommentModel.findById(parent);
      if (!parentComment) {
        return res.status(404).send({ msg: 'Parent comment not found' });
      }
      parentComment.responses.push(comment);
      await parentComment.save();
    }
    await comment.save();
    res.send(comment);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

const updateComment = async (req, res) => {
  const { id } = req.params;
  const { text } = req.body;
  try {
    const comment = await CommentModel.findByIdAndUpdate(id, { text }, { new: true });
    if (!comment) {
      return res.status(404).send({ msg: 'Comment not found' });
    }
    res.send(comment);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

const deleteComment = async (req, res) => {
  const { id } = req.params;
  try {
    const comment = await CommentModel.findByIdAndDelete(id);
    if (!comment) {
      return res.status(404).send({ msg: 'Comment not found' });
    }
    res.send({ msg: 'Comment deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

module.exports = {
  getComments,
  createComment,
  updateComment,
  deleteComment
};


// const CommentModel = require('../Models/commentModel');
// const User = require("../Models/registerModel");

// const getComments = async (req, res) => {
//   try {
//     const comments = await CommentModel.find().populate('responses');
//     res.send(comments);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Server error');
//   }
// };

// const createComment = async (req, res) => {
//   const { text, author, parent } = req.body;
//   try {
//     const user = await User.findOne({ _id: author }, { username: 1 });
//     if (!user) {
//       return res.status(404).send({ msg: 'User not found' });
//     }

//     const comment = new CommentModel({ text, author: user.username });
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

// const deleteComment = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const comment = await CommentModel.findByIdAndDelete(id);
//     if (!comment) {
//       return res.status(404).send({ msg: 'Comment not found' });
//     }
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
//   deleteComment
// };


