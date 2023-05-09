import { Link } from "react-router-dom";



function Navbar() {

    const token = localStorage.token

  return (
    <>
      {token?(
        <nav className="navbar">
            <ul class="nav justify-content-center"> 
                <Link to="/" className="main" class="navbar-brand">DevHub</Link>
                <Link to='/home'>Hub</Link>
                <Link to='/project'>My Project</Link>
                <Link to='/logout'>Log out</Link>
            </ul>
        </nav>
      ):(
        <nav className="navbar">
            <ul class="nav justify-content-center">
            <Link to="/" className="main" class="navbar-brand">DevHub</Link>
            <Link to='/register' class="nav-link">Register</Link>
            <Link to='/login' class="nav-link">Login</Link>
            </ul>
        </nav>
      )}

    </>
  )
}

export default Navbar