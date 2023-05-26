import React from 'react';
import { Link } from 'react-router-dom';
import "./Footer.css"

function Footer() {
  return (
    <div className='footContainer'>
      <footer className='footer'>
        <div iv className='footContainer'>
            <br/>
          <h5>DevHub</h5>
          <ul >
            <div >
              <Link className='links' to="/#">Questions</Link>
            </div>
            <div>
              <Link className='links' to="/#">Help</Link>
            </div>
          </ul>
        </div>
        <div>
        <br/>
          <h5>Products</h5>
          <ul>
            <div>
              <Link  className='links'to="/#">Teams</Link>
            </div>
            <div>
              <Link className='links' to="/#">Advertising</Link>
            </div>
           
          </ul>
        </div>
        <div>
        <br/>
          <h5>Company</h5>
          <ul>
            <div>
              <Link className='links' to="/#">About</Link>
            </div>
           
            <div>
              <Link className='links' to="/#">Contact Us</Link>
            </div>
          </ul>
        </div>
        <div>
        <br/>
          <h5>Blog</h5>
          <ul>        
            <div>
              <a className='links' href="#">Twitter</a>
            </div>
            <div>
              <a className='links' href="#">LinkedIn</a>
            </div>     
          </ul>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
