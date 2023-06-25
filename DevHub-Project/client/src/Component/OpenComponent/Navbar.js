
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import jwt_Decode from "jwt-decode"

function Navbar() {
  const [username,setUsername] =useState('')
  const token = localStorage.token;
  

  useEffect(() => {
    if(token) {
      let userId = jwt_Decode(token).username
      setUsername(userId)
      
    }
    
  }, [token]);

  return (
    <>
      {token ? (
        <nav className="navbar" class="navbar navbar-dark  --bs-primary-border-subtle">
          <ul class="nav nav-pills --bs-primary-border-subtle">
            <Link to="/home"  className="main" class="navbar-brand">
              Hub
            </Link>
            <Link to="/GetProjects"  class="navbar-brand">
              Project
            </Link>
            <Link to="/library"  class="navbar-brand">
              Library
            </Link>
            <h5> {username} </h5>
          </ul>
          <ul>
            <Link to="/logout"  class="btn btn-outline-danger my-3 my-sm-0">
              Log out
            </Link>
          </ul>
        </nav>
      ) : (
        <nav className="navbar" class="navbar navbar-dark --bs-primary-border-subtle">
          <ul class="nav nav-pills">
            <Link to="/" className="main" class="navbar-brand">
              DevHub
            </Link>
          </ul>
        </nav>
      )}
    </>
  );
}

export default Navbar;





