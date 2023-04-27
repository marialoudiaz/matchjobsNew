import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {URL} from '../config'
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import PageviewIcon from '@mui/icons-material/Pageview';
// import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';


const linkStyles = {
  defaultLink: {
    textDecoration: "none",
    color: "black",
    margin: "1rem",
    padding: "3rem",
    position: "relative",
    fontFamily: 'Montserrat',
  },
};
// Je passe comme props la fonction qui permet de savoir si je suis logged in (avec le token)
function Navbar({logout, isLoggedIn, userType, userID}) {

// // Ne pas faire apparaitre la navbar sur welcome/login/register

let navigate = useNavigate();


return (
  <>
 <div className="navbar" >
 <div className="navbar-left">

      {isLoggedIn===true &&
      <NavLink
      to={`/${userType}/${userID}`} 
      style= {linkStyles.defaultLink}> 
     
      Profile 
      </NavLink>
      }

     {isLoggedIn===true &&
      <NavLink
       to={`/${userType}/${userID}/discover`}
       style= {linkStyles.defaultLink}
      >
      matchjobs
     </NavLink>
    }
     
     {isLoggedIn===true
     &&
     <NavLink 
     to={`/Matches/${userID}`}
     style= {linkStyles.defaultLink}
     >
     
      Matches
     </NavLink>
    }
</div>

<div className="navbar-right">
    {isLoggedIn===true
    &&
    <span 
    onClick={logout}
    style= {linkStyles.defaultLink}
    > Logout
    </span>
    }
</div>
</div>
</>
    

  
)}
export default Navbar

