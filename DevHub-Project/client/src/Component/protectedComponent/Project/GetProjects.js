import { useState, useEffect } from "react";
import axios from "axios";

function GetProjects() {
  const [projects, setProjects] = useState([]);
  const token = localStorage.getItem("token");
  
  async function myProjects() {
    try {
      const result = await axios.get("http://localhost:8080/auth/getProjects", {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (Array.isArray(result.data)) {
        setProjects(result.data);
      } else {
        alert('error loading projects')
        console.log('Error: API response is not an array');
      }
    } catch (error) {
      console.log('Error: ', error);
    }
  }

  useEffect(() => {
    myProjects();
  }, []);

  return (
    <div>
      <h4>Projects</h4>
      <div>
        <div>
          {projects.map((project) => {
            return (
              <div className="form" key={project.id}>
                <h5>Title :</h5>
                <div>{project.title}</div>
                <br/>
                <h6>Technologies :</h6>
                <div>{project.technology}</div>
                <br/>
                <h6>Summary :</h6>
                <p>{project.summary}</p>
                <button href="#" className="card-link">
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


