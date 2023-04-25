import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar"
import Welcome from "./Views/Welcome"
import Login from "./Views/Login"
import Register from "./Views/Register"
import ProfileApplicant from './Views/ProfileApplicant';
import ProfileRecruiter from './Views/ProfileRecruiter';
import * as jose from 'jose'
import axios from 'axios';

function App() {
  // get the token from local storage
const [token, setToken]= useState(JSON.parse(localStorage.getItem('token')));

// verifier si connecté ou non
const [isLoggedIn, setIsLoggedIn]= useState(null);

// at every render verifier le token
useEffect(
  ()=>{
    const verify_token = async()=>{
      try {
        if(!token){
          setIsLoggedIn(false)
        }else{
          axios.defaults.headers.common['Authorization']=token;
          let decoded = jose.decodeJwt(token) // decoding the information form the token {userName,userType}
          const response = await axios.post((`${URL}/${decoded.userType}/verify_token`));
          return response.data.ok ? login(token) : logout();
        }
      } catch (error) {
        console.log(error); 
      }
    };
    verify_token();
  },
  [token]
);


// fonction pour login
const login =(token)=>{
  localStorage.setItem("token",JSON.stringify(token));
  setIsLoggedIn(true);
};

// fonction pour logout
const logout =()=>{
  localStorage.removeItem("token");
  setIsLoggedIn(false);
};


// Les différentes routes
  return (
    <div className="App">
    <Router>
      <Navbar isLoggedIn={isLoggedIn} userType={token.userType} userID={token._id}/>
    {/* We need to use the Routes wrapper */}
      <Routes>
    {/* For every URL we can render a separate component */}
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login login={login} />} />
        <Route path="/register" element={<Register login={login} />} />
        <Route path="/applicant/:id" element={<ProfileApplicant />} />
        <Route path="/recruiter/:id" element={<ProfileRecruiter />} />
    
        </Routes>
    </Router>
    </div>
  );
}

export default App;
