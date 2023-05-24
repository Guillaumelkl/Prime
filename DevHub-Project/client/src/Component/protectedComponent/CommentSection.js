
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CommentSection = () => {
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [responseTexts, setResponseTexts] = useState([]);
  const [userName, setUserName] = useState('');
  const [userId, setUserId] = useState(''); // Add userId state variable

  useEffect(() => {
    getComments();
    getUserName();
  }, []);

  const getComments = async () => {
    try {
      const response = await axios.get('http://localhost:8080/getComment');
      setComments(response.data.reverse());
    } catch (error) {
      console.error(error);
    }
  };

  const getUserName = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:8080/getUsername/${userId}`);
      setUserName(response.data.foundUserName);
    } catch (error) {
      console.error(error);
    }
  };

  const createComment = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/addComment', {
        text: commentText,
        userName: userName, 
        parent: null,
      });

      const newComment = response.data;
      setComments((prevComments) => [newComment, ...prevComments]);
      setCommentText('');
    } catch (error) {
      console.error(error);
    }
  };

  const createResponse = async (e, parentCommentId, commentIndex) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/addComment', {
        text: responseTexts[commentIndex],
        userName: userName, 
        parent: parentCommentId,
      });

      const newResponse = response.data;
      setComments((prevComments) => {
        const updatedComments = [...prevComments];
        const parentCommentIndex = updatedComments.findIndex(comment => comment._id === parentCommentId);
        updatedComments[parentCommentIndex].responses.push(newResponse);
        return updatedComments;
      });

      setResponseTexts((prevResponseTexts) => {
        const updatedResponseTexts = [...prevResponseTexts];
        updatedResponseTexts[commentIndex] = '';
        return updatedResponseTexts;
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleResponseTextChange = (e, commentIndex) => {
    const updatedResponseTexts = [...responseTexts];
    updatedResponseTexts[commentIndex] = e.target.value;
    setResponseTexts(updatedResponseTexts);
  };

  const deleteComment = async (commentId) => {
    try {
      await axios.delete(`/deleteComment/${commentId}`);
      setComments((prevComments) =>
        prevComments.filter((comment) => comment._id !== commentId)
      );
    } catch (error) {
      console.error(error);
    }
  };

  const deleteResponse = async (commentId, responseId) => {
    try {
      await axios.delete(
        `http://localhost:8080/deleteResponse/${commentId}/${responseId}`
      );
      setComments((prevComments) =>
        prevComments.map((comment) => ({
          ...comment,
          responses: comment.responses.filter(
            (response) => response._id !== responseId
          ),
        }))
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={createComment}>
        <input
          type="text"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Enter your comment"
        />
        <button type="submit">Submit</button>
      </form>

      <div>
        {comments.map((comment, commentIndex) => (
          <div key={comment._id} className="form">
            <p>
              <strong>{comment.userName}: </strong>
              {comment.text}
              {comment.userId === userId && (
                <button onClick={() => deleteComment(comment._id)}>Delete</button>
              )}
            </p>
            <ul>
              {comment.responses.map((response) => (
                <li key={response._id}>
                  <strong>{response.userName}: </strong>
                  {response.text}
                  {response.userId === userId && (
                    <button onClick={() => deleteResponse(comment._id, response._id)}>Delete</button>
                  )}
                </li>
              ))}
            </ul>
            <div>
              <form onSubmit={(e) => createResponse(e, comment._id, commentIndex)}>
                <input
                  type="text"
                  value={responseTexts[commentIndex] || ''}
                  onChange={(e) => handleResponseTextChange(e, commentIndex)}
                  placeholder="Enter your response"
                />
                <button type="submit">Submit Response</button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;





