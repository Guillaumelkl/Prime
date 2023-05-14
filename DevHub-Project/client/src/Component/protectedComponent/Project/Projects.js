import { Link } from "react-router-dom";


function Projects() {
  return (
   
      <div>
        <nav>
          <ul className="proLinks">
            <li className="proLinks">
              <Link to="/GetProjects" className="proLinks">My Projects</Link>
            </li>
            <li className="proLinks">
              <Link to="/addProject" className="proLinks">Add Project</Link>
            </li>
          </ul>
        </nav>
      </div>
   
  );
}

export default Projects;
