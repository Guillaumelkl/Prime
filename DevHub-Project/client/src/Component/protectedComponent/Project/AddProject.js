
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
      console.error(error);
    }
  };

  const handleReturn = () => {
    navigate('/Project');
  };

  return (
    <div>
      <h4>Add a new project</h4>
      <button onClick={handleReturn}>Return</button>
      <form onSubmit={handleSubmit}>
        <div>
          <div class="form-group">
            <label>Title :</label>
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
            <label>Technology :</label>
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
            <label>Summary :</label>
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
          <div class="form-group">
            <label>Project Link :</label>
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
          <button type="submit">Add Project</button>
        </div>
      </form>
    </div>
  );
}

export default AddProject;

