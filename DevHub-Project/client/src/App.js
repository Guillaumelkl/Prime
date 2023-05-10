import './App.css';
import { useState,useEffect } from "react";
import Navbar from './Component/OpenComponent/Navbar';
import { Routes, Route } from "react-router-dom";
import LandingPage from './Component/OpenComponent/LandingPage';
import Projects from './Component/protectedComponent/Projects';
import RegistrationForm from './Component/OpenComponent/registration/RegistrationForm';
import LoginForm from './Component/OpenComponent/Login/LoginForm';
import Home from './Component/protectedComponent/Home';
import Logout from './Component/protectedComponent/Logout';

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
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
