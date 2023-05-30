// import { Link } from "react-router-dom";



// function Navbar() {

//     const token = localStorage.token

//   return (
//     <>
//       {token?(
//         <nav className="navbar" class="navbar navbar-dark bg-dark">
//             <ul class="nav nav-pills"> 
                
//                 <Link to='/home' className="main" class="navbar-brand">Hub</Link>
//                 <Link to='/project' class="navbar-brand">Tech news</Link>
//                 <Link to="/GetProjects" class="navbar-brand">Project</Link>
                
//             </ul>
//             <ul>
//             <Link to='/logout' class="btn btn-outline-danger my-3 my-sm-0">Log out</Link>
//             </ul>
//         </nav>
//       ):(
//         <nav className="navbar" class="navbar navbar-dark bg-dark" >
//             <ul  class="nav nav-pills">
//             <Link to="/" className="main" class="navbar-brand">DevHub</Link>
            
//             </ul>     
//         </nav>
//       )}

//     </>
//   )
// }

// export default Navbar

import { Link } from "react-router-dom";
import React, { useState } from "react";

function Navbar() {
  const [refresh, setRefresh] = useState(false);
  const token = localStorage.token;

  const handleRefresh = () => {
    setRefresh(true);
    setTimeout(() => {
      setRefresh(false);
    }, 0);
  };

  return (
    <>
      {token ? (
        <nav className="navbar" class="navbar navbar-dark bg-dark">
          <ul class="nav nav-pills">
            <Link to="/home" onClick={handleRefresh} className="main" class="navbar-brand">
              Hub
            </Link>
            <Link to="/project" onClick={handleRefresh} class="navbar-brand">
              Library
            </Link>
            <Link to="/GetProjects" onClick={handleRefresh} class="navbar-brand">
              Project
            </Link>
          </ul>
          <ul>
            <Link to="/logout" onClick={handleRefresh} class="btn btn-outline-danger my-3 my-sm-0">
              Log out
            </Link>
          </ul>
        </nav>
      ) : (
        <nav className="navbar" class="navbar navbar-dark bg-dark">
          <ul class="nav nav-pills">
            <Link to="/" onClick={handleRefresh} className="main" class="navbar-brand">
              DevHub
            </Link>
          </ul>
        </nav>
      )}
    </>
  );
}

export default Navbar;

