import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {URL} from '../config'

// Je passe comme props la fonction qui permet de savoir si je suis logged in (avec le token)
function Navbar({isLoggedIn, userType, userID}) {

// // Ne pas faire apparaitre la navbar sur welcome/login/register

let navigate = useNavigate();

return (
     <div className="navbar">

     {isLoggedIn===true &&
      <>
      <NavLink
       to="/Discover"
      >
      matchjobs
     </NavLink>
     </>
    }

{/* /// AFFICHER LE PROFIL (conditional) */}
      {isLoggedIn && userType==='applicant' 
      &&
      <NavLink 
      to={`/applicant/${userID}`} > 
      Profile 
      </NavLink>
      }

      {isLoggedIn && userType==='recruiter' 
      &&
      <NavLink
      to={`/recruiter/${userID}`} > 
      Profile 
      </NavLink>
      }
     
     {isLoggedIn===true
     &&
     <NavLink 
     to={'/Matches'}
     >Matches
     </NavLink>
    }

    {isLoggedIn===true
    &&
    <NavLink 
    to={'/'}
    > Logout
    </NavLink>
    }
    
    {/* // when token expires */}
    {isLoggedIn===false
    &&
     navigate('/')
    }

  </div>
  
)}

export default Navbar
