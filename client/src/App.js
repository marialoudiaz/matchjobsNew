import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./Components/Navbar"
import Welcome from "./Views/Welcome"
import Login from "./Views/Login"
import Register from "./Views/Register"
import ProfileApplicant from './Views/ProfileApplicant';
import ProfileRecruiter from './Views/ProfileRecruiter';
import DiscoverApplicant from './Views/DiscoverApplicant';
import DiscoverRecruiter from './Views/DiscoverRecruiter';
import ViewApplicant from './Views/ViewApplicant';
import ViewRecruiter from './Views/ViewRecruiter';
import EditApplicant from './Views/EditApplicant';
import EditRecruiter from './Views/EditRecruiter';
import * as jose from 'jose'
import axios from 'axios';
import {URL} from "./config"


function App() {
  // get the token from local storage
const [token, setToken]= useState(JSON.parse(localStorage.getItem('token')));

// verifier si connecté ou non
const [isLoggedIn, setIsLoggedIn]= useState(null);

// update l'état de l'user
const [user,SetUser] = useState({});




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
  let decoded = jose.decodeJwt(token)
  SetUser(decoded)// set l'user et type user avec le token pour le passer dans la navbar
  console.log(decoded)
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
      <Navbar logout={logout} isLoggedIn={isLoggedIn} userType={user.userType} userID={user._id}/>
      <Routes>
    {/* For every URL we can render a separate component */}
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login login={login} />} />
        <Route path="/register" element={<Register login={login} />} /> 


        <Route path={`/applicant/:id`} 
        element={isLoggedIn && user.userType==='applicant' ? <ProfileApplicant user={user.email}/> : <Navigate to={'/'}/> } />  
        
        {/* // passer a la fonction login le type d'user et l'id */}
        <Route path={`/recruiter/:id`} 
       element={isLoggedIn && user.userType==='recruiter' ? <ProfileRecruiter user={user.email}/> : <Navigate to={'/'}/>} />  

        <Route path={`/applicant/:id/discover`} 
        element={isLoggedIn && user.userType==='applicant' ? <DiscoverApplicant user={user.email} userID={user._id}/> : <Navigate to={'/'}/> } />  
        
        {/* // passer a la fonction login le type d'user et l'id */}
        <Route path={`/recruiter/:id/discover`} 
       element={isLoggedIn && user.userType==='recruiter' ? <DiscoverRecruiter user={user.email} userID={user._id}/> : <Navigate to={'/'}/>} />  
    
       <Route path={`/applicant/:id/view`} 
        element={isLoggedIn && user.userType==='applicant' ? <ViewApplicant user={user._id}/> : <Navigate to={'/'}/> } />  
        
        {/* // passer a la fonction login le type d'user et l'id */}
        <Route path={`/recruiter/:id/view`} 
       element={isLoggedIn && user.userType==='recruiter' ? <ViewRecruiter user={user._id}/> : <Navigate to={'/'}/>} />  
    
        <Route path={`/applicant/:id/edit`} 
        element={isLoggedIn && user.userType==='applicant' ? <EditApplicant user={user}/> : <Navigate to={'/'}/> } />  
        
        {/* // passer a la fonction login le type d'user et l'id */}
        <Route path={`/recruiter/:id/edit`}
       element={isLoggedIn && user.userType==='recruiter' ? <EditRecruiter user={user}/> : <Navigate to={'/'}/>} />  
    

        </Routes>
    </Router>
    </div>
  );
}

export default App;
