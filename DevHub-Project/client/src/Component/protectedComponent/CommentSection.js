
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CommentSection = () => {
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [responseTexts, setResponseTexts] = useState([]);

  useEffect(() => {
    getComments();
  }, []);

  const getComments = async () => {
    try {
      const response = await axios.get('http://localhost:8080/getComment');
      setComments(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const createComment = async (e, parentCommentId = null) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/addComment', {
        text: commentText,
        author: 'Your Name', // Replace with the actual author's name or a user identifier
        parent: parentCommentId,
      });
      const newComment = response.data;
      setComments((prevComments) => [...prevComments, newComment]);
      setCommentText('');
    } catch (error) {
      console.error(error);
    }
  };

  const createResponse = async (e, parentCommentId, responseIndex) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/addComment', {
        text: responseTexts[responseIndex],
        author: 'Your Name', // Replace with the actual author's name or a user identifier
        parent: parentCommentId,
      });
      const newResponse = response.data;
      setComments((prevComments) => {
        const updatedComments = [...prevComments];
        const commentIndex = updatedComments.findIndex(
          (comment) => comment._id === parentCommentId
        );
        updatedComments[commentIndex].responses.push(newResponse);
        return updatedComments;
      });
      const updatedResponseTexts = [...responseTexts];
      updatedResponseTexts[responseIndex] = '';
      setResponseTexts(updatedResponseTexts);
    } catch (error) {
      console.error(error);
    }
  };

  const handleResponseTextChange = (e, responseIndex) => {
    const updatedResponseTexts = [...responseTexts];
    updatedResponseTexts[responseIndex] = e.target.value;
    setResponseTexts(updatedResponseTexts);
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
              <strong>{comment.author}: </strong>
              {comment.text}
            </p>
            <ul>
              {comment.responses.map((response, responseIndex) => (
                <li key={response._id}>
                  <strong>{response.author}: </strong>
                  {response.text}
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


