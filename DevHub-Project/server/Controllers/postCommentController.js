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


const getUsername = async (req, res) => {
  try {
    const {userName} = req.body;
    
    const user = await User.findOne( userName );
    console.log(user)

    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }
    
    const foundUserName = user.userName;
    console.log(foundUserName);
    res.send({foundUserName});
  } catch (error) {
    res.status(500).send(error);
  }
};




// const createComment = async (req, res) => {
//   const { text, userName, parent } = req.body;
//   if(!userName) {
//     console.log("userName no match")
//   }
//   try {
//     const comment = new CommentModel({ 
//       text:text, 
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


// const createComment = async (req, res) => {
//   const { text, parent,createdAt } = req.body;
//   const {userName} = req.id
  
//   try {

//     const comment = new CommentModel({ 
//       text:text, 
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

const createComment = async (req, res) => {
  const { text,userName, parent } = req.body;
  
  console.log(userName)

  try {
    const comment = new CommentModel({ 
      text: text, 
      userName: userName,
    });

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

const deleteComment = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.userId;

  try {
    const comment = await CommentModel.findById(id);
    if (!comment) {
      return res.status(404).send({ msg: 'Comment not found' });
    }

    
    if (comment.userId !== userId) {
      return res.status(401).send({ msg: 'Unauthorized' });
    }

    await CommentModel.findByIdAndDelete(id);
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
  deleteComment,
  getUsername
};




