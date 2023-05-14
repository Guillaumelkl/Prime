const express = require('express');
const router = express.Router();

const UserRegistry = require("../Controllers/registerController");
const userLogin = require("../Controllers/loginController");

const {getComments,
    createComment,
    updateComment,
    deleteComment
} = require("../Controllers/postCommentController")

router.post("/register", UserRegistry);
router.post("/login", userLogin );


router.get('/getComment', getComments);
router.post('/addComment', createComment);
router.put('/editComment/:id', updateComment);
router.delete('/deleteComment:id', deleteComment);

module.exports = router;
