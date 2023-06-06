
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
import "./Question.css"
import jwt_decode from "jwt-decode";

function Question() {
  const [question, setQuestion] = useState([]);
  const [questionText, setQuestionText] = useState('');
  const [questionTitle, setQuestionTitle] = useState('');
  const [token] = useState(localStorage.getItem('token'));
  const [commentInputs, setCommentInputs] = useState({});
  const [collapseIds, setCollapseIds] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [user, setUser] = useState('');

  const getQuestion = async () => {
    try {
      const result = await axios.get('http://localhost:8080/auth/getQuestion', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setQuestion(result.data.reverse());
      setCollapseIds(result.data.map(() => false));
    } catch (error) {
      console.error(error);
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
      console.error(error);
    }
  };

  const addComment = async (questionId) => {
    try {
      let token = localStorage.getItem("token");
      let userInfo = jwt_decode(token);
      
      const newComment = { comment: commentInputs[questionId] || '' };
      const updatedQuestion = question.map((q) => {
        if (q._id === questionId) {
          return { ...q, comments: [...q.comments, newComment] };
        }
        return q;
      });
      let commentSchema = {
        user_userName_id: userInfo.userName,
        commentText: newComment,
      };
      await axios.post(`http://localhost:8080/auth/comments/${questionId}`, newComment);
      setCommentInputs({ ...commentInputs, [questionId]: '' });
      setQuestion(updatedQuestion);
    } catch (error) {
      console.log(error);
    }
  };
  
  async function deleteQuestion(id) {
    const confirmed = window.confirm('Are you sure you want to delete this question?');
    if (!confirmed) {
      console.log('Deletion canceled');
      return;
    }

    try {
      await axios.delete(`http://localhost:8080/auth/deleteQuestion/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      alert('Deletion successful');
      getQuestion();
    } catch (error) {
      console.log('Error:', error);
    }
  }

  async function getUser(id){
    try {
      let token = localStorage.getItem("token");
      let userInfo = jwt_decode(token);
      let usernameSchema = {
        user_userName_id: userInfo.userName
      }
      const userName = await axios.get(`http://localhost:8080/auth/getUser/${id}`,usernameSchema,{
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        
      });
      

      setUser(userName.data.userName);
    } catch (error) {
      console.log(error);
    }
  }

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
  };

  const filteredQuestions = question.filter((q) =>
    q.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    getQuestion();
  }, []);

  console.log(question);
  return (
    <>
      <div>
        <div className='QuestionBox'>
          <MDBInput 
            label='Title' 
            id='formTextExample1' 
            type='text' 
            aria-describedby='textExample1'
            size='lg'
            value={questionTitle}
            onChange={(e) => setQuestionTitle(e.target.value)}
            placeholder="Enter the title..."
            required
          />
          <br />
          <textarea
            label='Message'
            id='textAreaExample'
            rows={7}
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
            placeholder="Ask a question..."
            required
          ></textarea>
          <br />
          <MDBBtn className='me-1' color='success' onClick={askQuestion}>
            Ask
          </MDBBtn>
        </div>
        <br/>
        <div>
          <input className='searchInput'
            label='search'
            type="text"
            placeholder="Search Question "
            value={searchQuery}
            onChange={handleSearch}
          />
          <div className='cardContainer'>
            {filteredQuestions.map((q, index) => (
              <MDBCard key={q._id} className='questionCard'>
                <MDBCardBody  className='cardBody'>
                  <MDBCardTitle>{q.title}</MDBCardTitle>
                  <MDBCardText>{q.text}</MDBCardText>
                  <button className='deleteQ' onClick={() => deleteQuestion(q._id)}>
                    Delete
                  </button>
                  <br/>
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
                        
                      <MDBBtn className='me-2' id='commentBtn' onClick={() => { addComment(q._id) }}>
                        Comment
                      </MDBBtn>
                
                    </MDBCardBody>
                    <MDBListGroup flush>
                      {q.comments.slice(0).reverse().map((comment) => (
                        <MDBListGroupItem key={comment._id}>
                          <p>{comment.comment}</p>
                        </MDBListGroupItem>
                      ))}
                    </MDBListGroup>
                  </MDBCollapse>
                </MDBCardBody>
              </MDBCard>  
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Question;


