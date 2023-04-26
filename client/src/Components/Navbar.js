import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {URL} from '../config'

// Je passe comme props la fonction qui permet de savoir si je suis logged in (avec le token)
function Navbar({logout, isLoggedIn, userType, userID}) {

// // Ne pas faire apparaitre la navbar sur welcome/login/register

let navigate = useNavigate();


return (
     <div className="navbar">

      {isLoggedIn===true &&
      <NavLink
      to={`/${userType}/${userID}`} > 
      Profile 
      </NavLink>
      }

     {isLoggedIn===true &&
      <NavLink
       to={`/Discover/${userID}`}
      >
      matchjobs
     </NavLink>
    }
     
     {isLoggedIn===true
     &&
     <NavLink 
     to={`/Matches/${userID}`}
     >Matches
     </NavLink>
    }

    {isLoggedIn===true
    &&
    <span 
    onClick={logout}
    > Logout
    </span>
    }
    
 

  </div>
  
)}

export default Navbar
