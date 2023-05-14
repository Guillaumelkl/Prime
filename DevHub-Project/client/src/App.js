import './App.css';
import { useState } from "react";
import Navbar from './Component/OpenComponent/Navbar';
import { Routes, Route } from "react-router-dom";
import LandingPage from './Component/OpenComponent/LandingPage';
import Projects from './Component/protectedComponent/Project/Projects';
import RegistrationForm from './Component/OpenComponent/registration/RegistrationForm';
import LoginForm from './Component/OpenComponent/Login/LoginForm';
import Home from './Component/protectedComponent/Home';
import Logout from './Component/protectedComponent/Logout';
import AddProject from './Component/protectedComponent/Project/AddProject';
import GetProjects from './Component/protectedComponent/Project/GetProjects';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleUserState = (state) => {
    setIsLoggedIn(state)
  }
  
  return (
    <div className="App">
          <div>
        <Navbar userState= {isLoggedIn}/>
        <div className='container'>
          <Routes>
            <Route path='/' element={<LandingPage />} />
            <Route path='/home' element={<Home />} />
            <Route path='/register' element={<RegistrationForm />} />
            <Route path='/login' element={<LoginForm onLogin = {handleUserState} />} />
            <Route path='/project' element={<Projects />} />
            <Route path='/logout' element={<Logout onLogout = {handleUserState}/>} />
            <Route path='/addProject' element={<AddProject />} />
            <Route path='/getProjects' element={<GetProjects />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
