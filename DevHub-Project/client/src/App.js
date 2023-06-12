import './App.css';
import { useState } from "react";
import Navbar from './Component/OpenComponent/Navbar';
import { Routes, Route } from "react-router-dom";
import LandingPage from './Component/OpenComponent/LandingPage';
import Library from './Component/protectedComponent/Project/Library';
import Question from './Component/protectedComponent/Question-answer/Question';
import LoginForm from './Component/OpenComponent/Login/LoginForm';
import Home from './Component/protectedComponent/Home';
import Logout from './Component/protectedComponent/Logout';
import AddProject from './Component/protectedComponent/Project/AddProject';
import GetProjects from './Component/protectedComponent/Project/GetProjects';
import Profil from './Component/protectedComponent/Profile/Profile';
import Footer from './Component/OpenComponent/Footer';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleUserState = (state) => {
    setIsLoggedIn(state)
  }
  
  return (
    <div className="App">
          <div >
        <Navbar userState= {isLoggedIn}/>
        <div  className="content">
          <Routes>
            <Route path='/' element={<LandingPage />} />
            <Route path='/home' element={<Home />} />
            <Route path='/home' element={<Question/>} />
            <Route path='/login' element={<LoginForm onLogin = {handleUserState} />} />
            <Route path='/library' element={<Library />} />
            <Route path='/logout' element={<Logout onLogout = {handleUserState}/>} />
            <Route path='/addProject' element={<AddProject />} />
            <Route path='/getProjects' element={<GetProjects />} />
            <Route path='/profile' element={<Profil />} />
          </Routes>   
        </div> 
      </div>
       <Footer/>  
    </div>
    
  );
}

export default App;
