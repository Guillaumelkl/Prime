
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBListGroup,
  MDBListGroupItem,
  MDBBtn,
  MDBInput,
  MDBCollapse,
} from 'mdb-react-ui-kit';
import './Question.css';
import jwt_Decode from "jwt-decode"

function Question() {
  const [question, setQuestion] = useState([]);
  const [questionText, setQuestionText] = useState('');
  const [questionTitle, setQuestionTitle] = useState('');
  const [token] = useState(localStorage.getItem('token'));
  const [commentInputs, setCommentInputs] = useState({});
  const [collapseIds, setCollapseIds] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [username, setUsername] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const getQuestion = async () => {
    try {
      const result = await axios.get('http://localhost:8080/auth/getQuestion', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setQuestion(result.data.reverse());
      setCollapseIds(result.data.map(() => false));
      return result;
    } catch (error) {
      return error;
    }
  };

  const askQuestion = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const newQuestion = { title: questionTitle, text: questionText };
      await axios.post('http://localhost:8080/auth/addQuestion', newQuestion, config);
      setQuestionTitle('');
      setQuestionText('');
      getQuestion();
    } catch (error) {
      alert('Cannot add Question');
      return error;
    }
  };

  const addComment = async (questionId) => {
    try {
      const newComment = { comment: commentInputs[questionId] || '', username: username };
      const updatedQuestion = question.map((q) => {
        if (q._id === questionId) {
          return { ...q, comments: [...q.comments, newComment] };
        }
        return q;
      });
      await axios.post(`http://localhost:8080/auth/comments/${questionId}`, newComment);
      setCommentInputs({ ...commentInputs, [questionId]: '' });
      setQuestion(updatedQuestion);
    } catch (error) {
      return error;
    }
  };

  const handleCommentChange = (e, questionId) => {
    setCommentInputs({ ...commentInputs, [questionId]: e.target.value });
  };

  const toggleCollapse = (questionId) => {
    setCollapseIds((prevCollapseIds) =>
      prevCollapseIds.map((collapseState, index) =>
        index === questionId ? !collapseState : collapseState
      )
    );
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setIsSearching(e.target.value.trim() !== '');
  };

  const filteredQuestions = question.filter((q) =>
    q.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    if (token) {
      let userId = jwt_Decode(token).username;
      setUsername(userId);
    }
    getQuestion();
  }, [token]);

  return (
    <>
      <div className='mainContainer'>
        {!isSearching && (
          <div className='QuestionBox'>
            <h6>Ask a public question</h6>
            <br />
            <MDBInput
              label='Title'
              id='formWhite'
              type='text'
              aria-describedby='textExample1'
              size='lg'
              value={questionTitle}
              onChange={(e) => setQuestionTitle(e.target.value)}
              placeholder='Enter the title...'
              required
              contrast
            />
            <br />
            <textarea
              label='Message'
              id='textAreaExample'
              rows={7}
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
              placeholder='Ask a question...'
              required
            ></textarea>
            <br />
            <MDBBtn className='me-1' color='success' onClick={askQuestion}>
              Ask
            </MDBBtn>
          </div>
        )}
        <div className='searchContainer'>
          <div>
            <input
              className={`searchInput${isSearching ? ' expanded' : ''}`}
              label='search'
              type='text'
              placeholder='Search Question'
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
          <div className='cards'>
            <div className='cardContainer'>
              {filteredQuestions.map((q, index) => (
                <MDBCard key={q._id} className='questionCard'>
                  <MDBCardBody className='cardBody'>
                    <MDBCardTitle className='textComment'>{q.title}</MDBCardTitle>
                    <br />
                    <MDBCardText className='textComment'>{q.text}</MDBCardText>
                    <br />
                    <MDBBtn
                      id={`commentBtn-${q._id}`}
                      className='btn btn-secondary'
                      onClick={() => toggleCollapse(index)}
                    >
                      {collapseIds[index] ? 'Close Comments' : 'Comment'}
                    </MDBBtn>
                    <MDBCollapse show={collapseIds[index]}>
                      <MDBCardBody>
                        <textarea
                          label='Message'
                          id='textAreaExample1'
                          rows={4}
                          type='text'
                          value={commentInputs[q._id] || ''}
                          onChange={(e) => handleCommentChange(e, q._id)}
                          placeholder='Add a comment...'
                          required></textarea>

                        <MDBBtn
                          className='me-2'
                          id='commentBtn'
                          onClick={() => {
                            addComment(q._id);
                          }}>
                          Comment
                        </MDBBtn>
                        <br />
                        <br />

                        {q.comments
                          .slice(0)
                          .reverse()
                          .map((comment) => (
                            <MDBListGroup className='listGroup' style={{ minWidth: '22rem' }} key={comment._id}>
                              <MDBListGroupItem className='listItem'>
                                <h5>{comment.username} :</h5>
                                <b/>
                                <b/>
                                <p> {comment.comment}</p>
                                </MDBListGroupItem>
                            </MDBListGroup>
                          ))}
                      </MDBCardBody>
                    </MDBCollapse>
                  </MDBCardBody>
                </MDBCard>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Question;





