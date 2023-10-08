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
    margin: "1rem ",
    padding: "2rem",
    position: "relative",
    fontFamily: 'Sora',
    fontSize:'1em',
    marginBottom: 'dark-grey',
    shadowOpacity:'0',
  },
  noDisplay: {
    display:"none"
  },
};
// Je passe comme props la fonction qui permet de savoir si je suis logged in (avec le token)
function Navbar({logout, isLoggedIn, userType, userID}) {

// // Ne pas faire apparaitre la navbar sur welcome/login/register

let navigate = useNavigate();


return (
  isLoggedIn?(
 <div className="navbar" >
 <div className="navbar-left">

      {isLoggedIn===true &&
      <NavLink
      to={`/${userType}/${userID}`} 
      style= {linkStyles.defaultLink}> 
     
      profile 
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
     to={`/${userType}/${userID}/matches`}
     style= {linkStyles.defaultLink}
     >
     
      matches
     </NavLink>
    }
</div>

<div className="navbar-right">
    {isLoggedIn===true
    &&
    <span 
    onClick={logout}
    style= {linkStyles.defaultLink}
    > logout
    </span>
    }
</div>
</div>
  ): null
  
)}
  
export default Navbar

