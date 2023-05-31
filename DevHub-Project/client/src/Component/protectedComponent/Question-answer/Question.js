
// import {
//   MDBCard,
//   MDBCardBody,
//   MDBCardTitle,
//   MDBCardSubTitle,
//   MDBCardText,
//   MDBCardLink,
//   MDBBtn,
//   MDBInput,
//   MDBTextArea 
// } from 'mdb-react-ui-kit';
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import "./Question.css"

// function Question() {
//   const [question, setQuestion] = useState([]);
//   const [questionText, setQuestionText] = useState('');
//   const [questionTitle, setQuestionTitle] = useState('');
//   const [commentText, setCommentText] = useState(''); 
//   const [token] = useState(localStorage.getItem('token'));
//   const [commentInputs, setCommentInputs] = useState({});

//   const getQuestion = async () => {
//     try {
//       const result = await axios.get('http://localhost:8080/auth/getQuestion', {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setQuestion(result.data.reverse());
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const askQuestion = async (e) => {
//     e.preventDefault();
//     try {
//       const config = {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       };
//       const newQuestion = { title: questionTitle, text: questionText };
//       await axios.post('http://localhost:8080/auth/addQuestion', newQuestion, config);
//       setQuestionTitle('');
//       setQuestionText('');
//       getQuestion();
//     } catch (error) {
//       alert('Cannot add Question');
//       console.error(error);
//     }
//   };

//   const addComment = async (questionId) => {
//     try {
//       const newComment = { comment: commentInputs[questionId] || '' };
//       const updatedQuestion = question.map((q) => {
//         if (q._id === questionId) {
//           return { ...q, comments: [...q.comments, newComment] };
//         }
//         return q;
//       });
//       await axios.post(`http://localhost:8080/auth/comments/${questionId}`, newComment);
//       setCommentInputs({ ...commentInputs, [questionId]: '' });
//       setQuestion(updatedQuestion);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   async function deleteQuestion(id) {
//     console.log(id);
//     const confirmed = window.confirm('Are you sure you want to delete this comment?');
//     if (!confirmed) {
//       console.log('Deletion canceled');
//       return;
//     }

//     try {
//       await axios.delete(`http://localhost:8080/auth/deleteQuestion/${id}`, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('token')}`,
//         },
//       });
//       alert('Deletion successful');
//       getQuestion();
//     } catch (error) {
//       console.log('Error:', error);
//     }
//   }

  

//   useEffect(() => {
//     getQuestion();
//   }, []);

//   const handleCommentChange = (e, questionId) => {
//     setCommentInputs({ ...commentInputs, [questionId]: e.target.value });
//   };

//   return (
//     <>
//       <h1>Question</h1>
//       <div div className='QuestionBox'>
//         <MDBInput 
//          label='Title' 
//          id='formTextExample1' 
//          type='text' 
//          aria-describedby='textExample1'
//          size='lg'
//           value={questionTitle}
//           onChange={(e) => setQuestionTitle(e.target.value)}
//           placeholder="Enter the title..."
//           required
//         />
//         <br />
//         <textarea label='Message' id='textAreaExample' rows={7}
//           value={questionText}
//           onChange={(e) => setQuestionText(e.target.value)}
//           placeholder="Ask a question..."
//           required
//         ></textarea>
//         <br />
//         <MDBBtn className='me-1' color='success' onClick={askQuestion}>Ask</MDBBtn>
//       </div>
//       <div>
//         <div className='cardContainer'>
          
//           {question.map((q) => (
//             <div className='questionCard' key={q._id}>
//               <div className='questionContainer'>
//               <h5>{q.title}</h5>
//               <br/>
//               <p>{q.text}</p>
              
//               <br/>
//               <button className='deleteQ' onClick={() => deleteQuestion(q._id)}>Delete</button>
//               </div>
//               <div className='comment-input'>
//                 <div className='comment'>
//               {q.comments.map((comment) => (
//                 <p key={comment._id}>{comment.comment}</p>
//               ))}
//               </div>
//               <textarea label='Message' id='textAreaExample' rows={2}
//                 type="text"
//                 value={commentInputs[q._id] || ''}
//                 onChange={(e) => handleCommentChange(e, q._id)}
//                 placeholder="Add a comment..."
//                 required
//               />
//               <MDBBtn className='me-1' onClick={() => addComment(q._id)}>Comment</MDBBtn>
//               </div>
              
              
//             </div>
//           ))}
//         </div>
//       </div>
//     </>
//   );
// }

// export default Question;


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import {
//   MDBCard,
//   MDBCardBody,
//   MDBCardTitle,
//   MDBCardText,
//   MDBListGroup,
//   MDBListGroupItem,
//   MDBBtn,
//   MDBInput,
// } from 'mdb-react-ui-kit';
// import "./Question.css"

// function Question() {
//   const [question, setQuestion] = useState([]);
//   const [questionText, setQuestionText] = useState('');
//   const [questionTitle, setQuestionTitle] = useState('');
//   const [commentText, setCommentText] = useState('');
//   const [token] = useState(localStorage.getItem('token'));
//   const [commentInputs, setCommentInputs] = useState({});

//   const getQuestion = async () => {
//     try {
//       const result = await axios.get('http://localhost:8080/auth/getQuestion', {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setQuestion(result.data.reverse());
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const askQuestion = async (e) => {
//     e.preventDefault();
//     try {
//       const config = {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       };
//       const newQuestion = { title: questionTitle, text: questionText };
//       await axios.post('http://localhost:8080/auth/addQuestion', newQuestion, config);
//       setQuestionTitle('');
//       setQuestionText('');
//       getQuestion();
//     } catch (error) {
//       alert('Cannot add Question');
//       console.error(error);
//     }
//   };

//   const addComment = async (questionId) => {
//     try {
//       const newComment = { comment: commentInputs[questionId] || '' };
//       const updatedQuestion = question.map((q) => {
//         if (q._id === questionId) {
//           return { ...q, comments: [...q.comments, newComment] };
//         }
//         return q;
//       });
//       await axios.post(`http://localhost:8080/auth/comments/${questionId}`, newComment);
//       setCommentInputs({ ...commentInputs, [questionId]: '' });
//       setQuestion(updatedQuestion);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   async function deleteQuestion(id) {
//     console.log(id);
//     const confirmed = window.confirm('Are you sure you want to delete this comment?');
//     if (!confirmed) {
//       console.log('Deletion canceled');
//       return;
//     }

//     try {
//       await axios.delete(`http://localhost:8080/auth/deleteQuestion/${id}`, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('token')}`,
//         },
//       });
//       alert('Deletion successful');
//       getQuestion();
//     } catch (error) {
//       console.log('Error:', error);
//     }
//   }

//   useEffect(() => {
//     getQuestion();
//   }, []);

//   const handleCommentChange = (e, questionId) => {
//     setCommentInputs({ ...commentInputs, [questionId]: e.target.value });
//   };

//   return (
//     <>
//     <div>
//       <h1>Question</h1>
//       <div className='QuestionBox'>
//         <MDBInput 
//           label='Title' 
//           id='formTextExample1' 
//           type='text' 
//           aria-describedby='textExample1'
//           size='lg'
//           value={questionTitle}
//           onChange={(e) => setQuestionTitle(e.target.value)}
//           placeholder="Enter the title..."
//           required
//         />
//         <br />
//         <textarea
//           label='Message'
//           id='textAreaExample'
//           rows={7}
//           value={questionText}
//           onChange={(e) => setQuestionText(e.target.value)}
//           placeholder="Ask a question..."
//           required
//         ></textarea>
//         <br />
//         <MDBBtn className='me-1' color='success' onClick={askQuestion}>
//           Ask
//         </MDBBtn>
//       </div>
//       <br/>
//       <div>
//         <div className='cardContainer'>
//           {question.map((q) => (
//             <MDBCard key={q._id} className='questionCard'>
//               <MDBCardBody>
//                 <MDBCardTitle>{q.title}</MDBCardTitle>
//                 <MDBCardText>{q.text}</MDBCardText>
//                 <button className='deleteQ' onClick={() => deleteQuestion(q._id)}>
//                   Delete
//                 </button>
//               </MDBCardBody>
//               <MDBListGroup flush>
//                 {q.comments.map((comment) => (
//                   <MDBListGroupItem key={comment._id}>{comment.comment}</MDBListGroupItem>
//                 ))}
//               </MDBListGroup>
//               <MDBCardBody>
//                 <textarea
//                   label='Message'
//                   id='textAreaExample'
//                   rows={2}
//                   type='text'
//                   value={commentInputs[q._id] || ''}
//                   onChange={(e) => handleCommentChange(e, q._id)}
//                   placeholder='Add a comment...'
//                   required
//                 />
//                 <MDBBtn className='me-1' onClick={() => addComment(q._id)}>
//                   Comment
//                 </MDBBtn>
//               </MDBCardBody>
//             </MDBCard>
//           ))}
//         </div>
//       </div>
//     </div>
//     </>
//   );
// }

// export default Question;


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



function Question() {
  const [question, setQuestion] = useState([]);
  const [questionText, setQuestionText] = useState('');
  const [questionTitle, setQuestionTitle] = useState('');
  const [commentText, setCommentText] = useState('');
  const [token] = useState(localStorage.getItem('token'));
  const [commentInputs, setCommentInputs] = useState({});
  const [collapseIds, setCollapseIds] = useState([]);
  

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
      const newComment = { comment: commentInputs[questionId] || '' };
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
      console.log(error);
    }
  };

  async function deleteQuestion(id) {
    console.log(id);
    const confirmed = window.confirm('Are you sure you want to delete this comment?');
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

  useEffect(() => {
    getQuestion();
  }, []);

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

  return (
    <>
      <div>
        <h1>Question</h1>
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
          <div className='cardContainer'>
            {question.map((q, index) => (
              <MDBCard key={q._id} className='questionCard'>
                <MDBCardBody>
                  <MDBCardTitle>{q.title}</MDBCardTitle>
                  <MDBCardText>{q.text}</MDBCardText>
                  <button className='deleteQ' onClick={() => deleteQuestion(q._id)}>
                    Delete
                  </button>

                  <MDBBtn
                    id={`commentBtn-${q._id}`}
                    className='btn btn-secondary'
                    onClick={() => toggleCollapse(index)}
                  >
                    {collapseIds[index] ? 'Close Comments' : 'Comment'}
                  </MDBBtn>

                  <MDBCollapse show={collapseIds[index]}>
                    <MDBListGroup flush>
                      {q.comments.map((comment) => (
                        <MDBListGroupItem className='commentSection' key={comment._id}>{comment.comment}</MDBListGroupItem>
                      ))}
                      <MDBCardBody>  
                        <textarea
                          label='Message'
                          id='textAreaExample1'
                          rows={4}
                          type='text'
                          value={commentInputs[q._id] || ''}
                          onChange={(e) => handleCommentChange(e, q._id)}
                          placeholder='Add a comment...'
                          required
                        ></textarea>
                      
                        <MDBBtn className='me-2' onClick={() => addComment(q._id)}>
                          Comment
                        </MDBBtn>
                      </MDBCardBody>
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


