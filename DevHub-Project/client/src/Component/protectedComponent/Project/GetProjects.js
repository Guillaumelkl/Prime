import React from 'react';
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

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "./getProject.css"

function GetProjects() {
  const [projects, setProjects] = useState([]);
  const [token] = useState(localStorage.getItem('token'));
  const [editedProjects, setEditedProjects] = useState([]);
  const [editModeIndex, setEditModeIndex] = useState(null);

  async function myProjects() {
    try {
      const result = await axios.get('http://localhost:8080/auth/getProjects', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProjects(result.data);
    } catch (error) {
      console.log('Error: ', error);
    }
  }

  async function deleteProject(id) {
    const confirmed = window.confirm('Are you sure you want to delete this project?');
    if (!confirmed) {
      console.log('Project deletion');
      return;
    }

    try {
      await axios.delete(`http://localhost:8080/auth/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      alert('Project deleted');
      myProjects();
    } catch (error) {
      console.log('Error: ', error);
    }
  }

  async function editProject(id, title, technology, summary, URL) {
    try {
      await axios.put(
        `http://localhost:8080/auth/editProject/${id}`,
        {
          title,
          technology,
          summary,
          URL,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      alert('Project updated');
      myProjects();
      setEditModeIndex(null); 
    } catch (error) {
      console.log('Error: ', error);
    }
  }

  

  const handleEdit = (index, field, value) => {
    const updatedProjects = [...editedProjects];
    updatedProjects[index] = { ...updatedProjects[index], [field]: value };
    setEditedProjects(updatedProjects);
  };

  useEffect(() => {
    myProjects();
  }, []);

  return (
    <div >
      
      <form >
      <ul className='prolinkList'>
        <Link to="/addProject" className='proLink'>
          Add Project
        </Link>
      </ul>
      <br/>
      <div>
        <div className='container'>
          {projects.map((project, index) => {
            const editedProject = editedProjects[index] || project;
            const isEditMode = editModeIndex === index;

            return (
              <div className='container'> 
              <div className='projectContainer' key={project._id}>
                <h5 className='titles'>Title </h5>
                {isEditMode ? (
                  <MDBInput label='New title?' 
                  id='formTextExample1' 
                  type='text' 
                  aria-describedby='textExample1'
                    
                    value={editedProject.title}
                    onChange={(e) => handleEdit(index, 'title', e.target.value)}
                  />
                ) : (
                  <div>{project.title}</div>
                )}
                <br />
                <h5 className='titles'>Technologies </h5>
                {isEditMode ? (
                  <MDBInput label='What are the technologies?' 
                  id='formTextExample1' 
                  type='text' 
                  aria-describedby='textExample1'
                    
                    value={editedProject.technology}
                    onChange={(e) => handleEdit(index, 'technology', e.target.value)}
                  />
                ) : (
                  <div>{project.technology}</div>
                )}
                <br />
                <h5 className='titles'>Summary </h5>
                {isEditMode ? (
                  <MDBTextArea  label='Any Updates?' id='textAreaExample' rows={6}
                    value={editedProject.summary}
                    onChange={(e) => handleEdit(index, 'summary', e.target.value)}
                  ></MDBTextArea>
                ) : (
                  <p>{project.summary}</p>
                )}
                <br />
                <h5 className='titles'>Project Link </h5>
                {isEditMode ? (
                  <MDBInput label='New link?' 
                  id='formTextExample1' 
                  type='text' 
                  aria-describedby='textExample1'
                    
                    value={editedProject.URL}
                    onChange={(e) => handleEdit(index, 'URL', e.target.value)}
                  />
                ) : (
                  project.URL && (
                    <a href={project.URL} target="_blank" rel="noopener noreferrer">
                      {project.URL}
                    </a>
                  )
                )}
                <br />
                
                <MDBBtn className="projectBtn" onClick={() => deleteProject(project._id)}>
                  Delete
                </MDBBtn>
                {isEditMode ? (
                  <bMDBBtn
                    className="projectBtn"
                    onClick={() =>
                      editProject(
                        project._id,
                        editedProject.title,
                        editedProject.technology,
                        editedProject.summary,
                        editedProject.URL
                      )
                    }
                  >
                    Confirm
                  </bMDBBtn>
                ) : (
                  <MDBBtn
                    className="projectBtn"
                    onClick={() => setEditModeIndex(index)}
                  >
                    Edit
                  </MDBBtn>
                )}
              </div>
              </div>
            );
          })}
        </div>
      </div>
      </form>
    </div>
  );
}

export default GetProjects;



