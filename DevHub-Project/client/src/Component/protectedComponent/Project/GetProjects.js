
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";



function GetProjects() {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

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

  useEffect(() => {
    myProjects();
  }, []);




  return (
    <div>
      <h4>My Projects</h4>
      <ul>
      <Link to="/addProject" class="navbar-brand">Add Project</Link>
      </ul>
     
      <div>
        <div>
          {projects.map((project) => {
            return (
              <div className="form" key={project._id}>
                <h5>Title :</h5>
                <div>{project.title}</div>
                <br />
                <h6>Technologies :</h6>
                <div>{project.technology}</div>
                <br />
                <h6>Summary :</h6>
                <p>{project.summary}</p>
                <br />
                <h6>Project Link :</h6>
                {project.URL && (
                  <a href={project.URL} target="_blank" rel="noopener noreferrer">
                    {project.URL}
                  </a>
                )}
                <br/>
                <br/>
                <button className="card-link" onClick={() => deleteProject(project._id)}>
                  Delete
                </button>
                <button
                  className="card-link"
                >
                  Edit
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default GetProjects;
