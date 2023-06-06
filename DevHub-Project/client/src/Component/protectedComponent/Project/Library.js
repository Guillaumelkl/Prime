import React from 'react';
import './Library.css'; 

function Library() {
  return (
    <div className="library-container">
      <div className="category">
        <h2>React JS</h2>
        <ul>
          <li>
            <a href="https://react.dev/learn/installation" target="_blank" rel="noopener noreferrer">Installation React J.S</a>
          </li>
          <li>
            <a href="https://react.dev/learn/react-developer-tools" target="_blank" rel="noopener noreferrer">Developer Tool</a>
          </li>
          <li>
            <a href="https://react.dev/learn/managing-state" target="_blank" rel="noopener noreferrer">Managing State</a>
          </li>
          <li>
            <a href="https://react.dev/learn/your-first-component" target="_blank" rel="noopener noreferrer">First Component</a>
          </li>
          <li>
            <a href="https://react.dev/learn/rendering-lists#rendering-data-from-arrays" target="_blank" rel="noopener noreferrer">rendering data from arrays</a>
          </li>
          <li>
            <a href="https://react.dev/" target="_blank" rel="noopener noreferrer">For more information</a>
          </li>
        </ul>
      </div>

      <div className="category">
        <h2>Javascript</h2>
        <ul>
          <li>
            <a href="https://www.w3schools.com/js/js_intro.asp" target="_blank" rel="noopener noreferrer">introduction to Javascript</a>
          </li>
          <li>
            <a href="https://www.w3schools.com/js/js_strings.asp"target="_blank" rel="noopener noreferrer">JS String</a>
          </li>
          <li>
            <a href="https://www.w3schools.com/js/js_syntax.asp" target="_blank" rel="noopener noreferrer">Syntax</a>
          </li>
          <li>
            <a href="https://www.w3schools.com/js/js_arrays.asp"target="_blank" rel="noopener noreferrer">Arrays</a>
          </li>
          <li>
            <a href="https://www.w3schools.com/js/js_functions.asp" target="_blank" rel="noopener noreferrer">Functions</a>
          </li>
          <li>
            <a href="https://www.w3schools.com/js/default.asp" target="_blank" rel="noopener noreferrer">For more information</a>
          </li>
        </ul>
      </div>

      <div className="category">
        <h2>CSS</h2>
        <ul>
          <li>
            <a href="https://www.w3schools.com/css/css_intro.asp" target="_blank" rel="noopener noreferrer">Introduction to C.S.S</a>
          </li>
          <li>
            <a href="https://www.w3schools.com/css/css_syntax.asp" target="_blank" rel="noopener noreferrer">Syntax</a>
          </li>
          <li>
            <a href="https://www.w3schools.com/css/css_selectors.asp" target="_blank" rel="noopener noreferrer">Selectors</a>
          </li>
          <li>
            <a href="https://www.w3schools.com/css/css_combinators.asp" target="_blank" rel="noopener noreferrer">Combinators</a>
          </li>
          <li>
            <a href="https://www.w3schools.com/css/css3_gradients.asp" target="_blank" rel="noopener noreferrer">Gradient</a>
          </li>
          <li>
            <a href="https://www.w3schools.com/css/default.asp" target="_blank" rel="noopener noreferrer">For more information</a>
          </li>
        </ul>
      </div>

      <div className="category">
        <h2>Node.JS and express JS</h2>
        <ul>
          <li>
            <a href="https://expressjs.com/en/starter/installing.html" target="_blank" rel="noopener noreferrer">Express installation</a>
          </li>
          <li>
            <a href="https://expressjs.com/en/guide/routing.html"target="_blank" rel="noopener noreferrer">Express JS guide</a>
          </li>
          <li>
            <a href="lhttps://expressjs.com/en/resources/glossary.html" target="_blank" rel="noopener noreferrer">Express resources</a>
          </li>
          <li>
            <a href="https://nodejs.org/dist/latest-v20.x/docs/api/" target="_blank" rel="noopener noreferrer"> Node JS documentation</a>
          </li>
          <li>
            <a href="https://nodejs.org/en" target="_blank" rel="noopener noreferrer"> Node JS download</a>
          </li>
          <li>
            <a href="https://expressjs.com" target="_blank" rel="noopener noreferrer"> For more information</a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Library;


