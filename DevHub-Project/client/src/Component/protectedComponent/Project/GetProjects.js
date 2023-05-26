

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

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

  useEffect(() => {
    myProjects();
  }, []);

  const handleEdit = (index, field, value) => {
    const updatedProjects = [...editedProjects];
    updatedProjects[index] = { ...updatedProjects[index], [field]: value };
    setEditedProjects(updatedProjects);
  };

  return (
    <div>
      <h4>My Projects</h4>
      <ul>
        <Link to="/addProject" className="navbar-brand">
          Add Project
        </Link>
      </ul>

      <div>
        <div>
          {projects.map((project, index) => {
            const editedProject = editedProjects[index] || project;
            const isEditMode = editModeIndex === index;

            return (
              <div className="form" key={project._id}>
                <h5>Title :</h5>
                {isEditMode ? (
                  <input
                    type="text"
                    value={editedProject.title}
                    onChange={(e) => handleEdit(index, 'title', e.target.value)}
                  />
                ) : (
                  <div>{project.title}</div>
                )}
                <br />
                <h6>Technologies :</h6>
                {isEditMode ? (
                  <input
                    type="text"
                    value={editedProject.technology}
                    onChange={(e) => handleEdit(index, 'technology', e.target.value)}
                  />
                ) : (
                  <div>{project.technology}</div>
                )}
                <br />
                <h6>Summary :</h6>
                {isEditMode ? (
                  <textarea
                    value={editedProject.summary}
                    onChange={(e) => handleEdit(index, 'summary', e.target.value)}
                  ></textarea>
                ) : (
                  <p>{project.summary}</p>
                )}
                <br />
                <h6>Project Link :</h6>
                {isEditMode ? (
                  <input
                    type="text"
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
                <br />
                <button className="card-link" onClick={() => deleteProject(project._id)}>
                  Delete
                </button>
                {isEditMode ? (
                  <button
                    className="card-link"
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
                  </button>
                ) : (
                  <button
                    className="card-link"
                    onClick={() => setEditModeIndex(index)}
                  >
                    Edit
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default GetProjects;






