import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function GetProjects() {
  const [projects, setProjects] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  async function myProjects() {
    try {
      const result = await axios.get("http://localhost:8080/auth/getProjects", {
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
    const confirmed = window.confirm("Are you sure you want to delete this project?");
    if (!confirmed) {
      console.log("Project deletion");
      return;
    }
  
    try {
      await axios.delete(`http://localhost:8080/auth/delete/${id}`);
  
      myProjects();
    } catch (error) {
      console.log('Error: ', error);
    }
  }

  useEffect(() => {
    myProjects();
  }, []);

  const handleReturn = () => {
    navigate("/Project");
  };

  return (
    <div>
      <h4>Projects</h4>
      <button onClick={handleReturn}>Return</button>
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
                <button href="#" className="card-link" onClick={() => deleteProject(project._id)}>
                  Delete
                </button>
                <button href="#" className="card-link">
                  Code
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






