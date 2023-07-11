
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardHeader,
  MDBCardFooter,
  MDBBtn
} from 'mdb-react-ui-kit';
import "./addProject.css"

function AddProject() {
  const [title, setTitle] = useState('');
  const [technology, setTechnology] = useState('');
  const [summary, setSummary] = useState('');
  const [URL, setURL] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const newProject = { title, technology, summary, URL };
      await axios.post('http://localhost:8080/auth/postProject', newProject, config);
      setTitle('');
      setTechnology('');
      setSummary('');
      setURL('');
      alert('Project added successfully!');
      navigate('/getProjects');

    } catch (error) {
      alert('Cannot add project');
      
    }
  };

  

  return (
    <div className='container'>
    <MDBCard alignment='center' >
      <MDBCardBody className='cardBod'>
        <MDBCardTitle className='lab'>Store a new project</MDBCardTitle>
        <form  onSubmit={handleSubmit}>
          <div className='addProContainer'>
            <div  >
              <label className='lab'>Title </label>
              <input
                type="text"
                class="form-control"
                id="exampleFormControlInput1"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <br />
            <div class="form-group">
              <label className='lab' >Technology </label>
              <input
                type="text"
                class="form-control"
                id="exampleFormControlInput1"
                placeholder="Technology"
                value={technology}
                onChange={(e) => setTechnology(e.target.value)}
                required
              />
            </div>
            <br />
            <div class="form-group">
              <label className='lab'>Summary </label>
              <textarea
                type="text"
                placeholder="Summary"
                class="form-control"
                id="exampleFormControlTextarea1"
                rows="3"
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                required
              />
            </div>
            <br />
            <div >
              <label className='lab' >Project Link </label>
              <input
                type="text"
                class="form-control"
                id="exampleFormControlInput1"
                placeholder="URL"
                value={URL}
                onChange={(e) => setURL(e.target.value)}
                required
              />
            </div>
            <br />
            <MDBBtn>Submit</MDBBtn>
          </div>
        </form>
      </MDBCardBody>
    </MDBCard>
    </div>
  );
}

export default AddProject;
