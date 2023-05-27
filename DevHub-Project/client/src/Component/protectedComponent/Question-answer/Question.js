
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Question() {
  const [question, setQuestion] = useState([]);
  const [questionText, setQuestionText] = useState('');
  const [questionTitle, setQuestionTitle] = useState('');
  const [token] = useState(localStorage.getItem('token'));

  

  const getQuestion = async () => {
    try {
      const result = await axios.get('http://localhost:8080/auth/getQuestion',{
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
      const newQuestion = { title:questionTitle, text:questionText };
      await axios.post('http://localhost:8080/auth/addQuestion', newQuestion, config);
           setQuestionTitle(''); 
           setQuestionText('');
           getQuestion()  
    } catch (error) {
      alert('Cannot add Question');
      console.error(error);
    }
  };



  const editQuestion = async (id) => {
    try {
      const response = await axios.put(`http://localhost:8080/auth/editQuestion/${id}`);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };


  async function deleteQuestion(id) {
    console.log(id)
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
  
  console.log(question)

  useEffect(() => {
    getQuestion();
  }, []);


  return (
    <div>
      <h1>Question</h1>
      <div>
        <input
          type="text"
          value={questionTitle}
          onChange={(e) => setQuestionTitle(e.target.value)}
          placeholder="Enter the title..."
          required
        />
        <br />
        <textarea
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
          placeholder="Ask a question..."
          required
        ></textarea>
        <br />
        <button onClick={askQuestion}>Ask</button>
      </div>
      <div >
        <div >
        {question.map((question) => (
          <div className='form' key={question._id}>
            <h2>{question.title}</h2>
            <p>{question.text}</p>
            <button onClick={() => editQuestion(question._id)}>Edit</button>
            <button onClick={() => deleteQuestion(question._id)}>Delete</button>
            </div>
          
        ))}
        </div>
      </div>
    </div>
  );
}

export default Question;




