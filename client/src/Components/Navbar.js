import React from "react";
import { NavLink } from "react-router-dom";

// Je passe comme props la fonction qui permet de savoir si je suis logged in (avec le token)
function Navbar({isLoggedIn}) {
  return (
    <h1>Navbar</h1>
//     <div className="navbar">

//     {/* // NavLink type */}


//     <NavLink
//     to={'/Discover'}
//       style={ ({isActive}) => (
//         isActive ? linkStyles.activeLink : linkStyles.defaultLink
//       )}>
//     matchjobs
//     </NavLink>


//     <NavLink
//     // if user type =='applicant'
//     to={'/applicant/:id'}
//     // // if user type =='applicant'
//     // to={'/recruiter/:id'}

//       style={ ({isActive}) => (
//         isActive ? linkStyles.activeLink : linkStyles.defaultLink
//       )}>
//     Profile
//     </NavLink>

//     <NavLink
//     to={'/Discover'}
//       style={ ({isActive}) => (
//         isActive ? linkStyles.activeLink : linkStyles.defaultLink
//       )}>
//     Discover
//     </NavLink>

//     <NavLink
//     to={'/Matches'}
//       style={ ({isActive}) => (
//         isActive ? linkStyles.activeLink : linkStyles.defaultLink
//       )}>
//     Matches
//     </NavLink>

//     <NavLink
//     // Appelle la fonction logout
//     to={'/Logout'}
//       style={ ({isActive}) => (
//         isActive ? linkStyles.activeLink : linkStyles.defaultLink
//       )}>
//     Matches
//     </NavLink>


//     </div>


// // Ne pas faire apparaitre la navbar sur welcome/login/register




  )
}

export default Navbar

const linkStyles = {
  activeLink:{
    color:"black",
  },
  defaultLink: {
    textDecoration: "none",
    color:"black"
  }
}