import { Link } from "react-router-dom";



function Navbar() {

    const token = localStorage.token

  return (
    <>
      {token?(
        <nav className="navbar" class="navbar navbar-dark bg-dark">
            <ul class="nav nav-pills"> 
                <Link to="/" className="main" class="navbar-brand">DevHub</Link>
                <Link to='/home' class="navbar-brand">Hub</Link>
                <Link to='/project' class="navbar-brand">Project</Link>
                
            </ul>
            <ul>
            <Link to='/logout' class="btn btn-outline-danger my-3 my-sm-0">Log out</Link>
            </ul>
        </nav>
      ):(
        <nav className="navbar" class="navbar navbar-dark bg-dark" >
            <ul  class="nav nav-pills">
            <Link to="/" className="main" class="navbar-brand">DevHub</Link>
            
            </ul>
            <ul>
            <Link to='/register' class="btn btn-outline-success my-3 my-sm-0">Register</Link>
            br
            <Link to='/login' class="btn btn-outline-success my-3 my-sm-0">Login</Link>
            
            </ul>
          
        </nav>
      )}

    </>
  )
}

export default Navbar