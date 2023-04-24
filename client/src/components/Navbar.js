import React from "react";
import { NavLink } from "react-router-dom";
import {URL} from '../config'

const Navbar = ({isLoggedIn, user}) => {
    // user is the state variable with userName and userType from the token

  return (
    <div className="navbar">
    {isLoggedIn === true
    && 
    <>

    <NavLink 
    to={`/${user.userType}/main`}  >
    Logo
    </NavLink>

    <NavLink 
    to={`/${user.userType}/profile/${user._id}`}  >
    icon profile<p>profile</p>
    </NavLink>

    <NavLink 
    to={`/${user.userType}/main`}  >
    discover icon <p>Discover</p>
    </NavLink>

    <NavLink 
    to={`/${user.userType}/matches`}  >
    match icon <p>Matches</p>
    </NavLink>

    <NavLink 
    to={`/${user.userType}/admin`}  >
    <p>Admin</p>
    </NavLink>

    <NavLink 
    to={`/${user.userType}/login`}  >
    <p>Login</p>
    </NavLink>

    <NavLink 
    to={`/${user.userType}/register`}  >
    <p>Register</p>
    </NavLink>

    <NavLink 
    to={`/${user.userType}/matches`}  >
    logout icon<p>Logout</p>
    </NavLink>

    </>
    }






    {!isLoggedIn
      && <>

    <NavLink 
    to={"/"} aria-disabled = 'true'>
    icon profile
    </NavLink>
    <NavLink 
    to={`/${user.userType}/main`}  aria-disabled = 'true'>
    logo
    </NavLink>
    <NavLink 
    to={`/register`}  >
    register
    </NavLink>
    <NavLink 
    to={`/login`}  >
    login
    </NavLink>
    <NavLink 
    to={`/${user.userType}/matches`}  >
    matches sign
    </NavLink>
    </>
      
    }

    </div>
  )
}

export default Navbar;

const linkStyles = {
 
}
