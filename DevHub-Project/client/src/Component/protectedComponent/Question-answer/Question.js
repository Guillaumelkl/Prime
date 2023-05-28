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

//   const addComment = async (id) => {
//     try {
//       const newComment = { comment: commentText }; 
//       await axios.post(`http://localhost:8080/auth/comments/${id}`, newComment);
//       setCommentText(''); 
//       getQuestion();
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

//   console.log(question);

//   useEffect(() => {
//     getQuestion();
//   }, []);

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
//         <button onClick={askQuestion}>Ask</button>
//       </div>
//       <div>
//         <div >
//           {question.map((q) => (
//             <div key={q._id}>
//               <h2>{q.title}</h2>
//               <p>{q.text}</p>
//               <br/>
//               {q.comments.map((comment) => (
//                 <p key={comment._id}>{comment.text}</p>
//               ))}
//               <input
//                 type="text"
//                 value={commentText}
//                 onChange={(e) => setCommentText(e.target.value)}
//                 placeholder="Add a comment..."
//                 required
//               />
//               <button onClick={() => addComment(q._id)}>Comment</button>
//               <button onClick={() => deleteQuestion(q._id)}>Delete</button>
//             </div>
//           ))}
//         </div>
//       </div>
//     </>
//   );
// }

// export default Question;


import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardSubTitle,
  MDBCardText,
  MDBCardLink,
  MDBBtn,
  MDBInput,
  MDBTextArea 
} from 'mdb-react-ui-kit';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./Question.css"

function Question() {
  const [question, setQuestion] = useState([]);
  const [questionText, setQuestionText] = useState('');
  const [questionTitle, setQuestionTitle] = useState('');
  const [commentText, setCommentText] = useState(''); 
  const [token] = useState(localStorage.getItem('token'));
  const [commentInputs, setCommentInputs] = useState({});

  const getQuestion = async () => {
    try {
      const result = await axios.get('http://localhost:8080/auth/getQuestion', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setQuestion(result.data.reverse());
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

  console.log(question);

  useEffect(() => {
    getQuestion();
  }, []);

  const handleCommentChange = (e, questionId) => {
    setCommentInputs({ ...commentInputs, [questionId]: e.target.value });
  };

  return (
    <>
      <h1>Question</h1>
      <div div className='QuestionBox'>
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
        <textarea label='Message' id='textAreaExample' rows={7}
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
          placeholder="Ask a question..."
          required
        ></textarea>
        <br />
        <button onClick={askQuestion}>Ask</button>
      </div>
      <div>
        <div>
          {question.map((q) => (
            <div key={q._id}>
              <h2>{q.title}</h2>
              <p>{q.text}</p>
              <br/>
              <button onClick={() => deleteQuestion(q._id)}>Delete</button>
              {q.comments.map((comment) => (
                <p key={comment._id}>{comment.comment}</p>
              ))}
              <input
                type="text"
                value={commentInputs[q._id] || ''}
                onChange={(e) => handleCommentChange(e, q._id)}
                placeholder="Add a comment..."
                required
              />
              <button onClick={() => addComment(q._id)}>Comment</button>
              
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Question;


