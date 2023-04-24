import React, { useState,useEffect } from "react";
import {useParams, Link, useNavigate} from 'react-router-dom'
import axios from "axios";
import { URL } from "../config";
import Edit from './Edit';



function Welcome() {
  return (
<>
<div>
<h1>Welcome to a new era of recruitement</h1>
{/* // logo matchjobs */}
<h2>Are you looking for a new job or a new employee ?</h2>

<NavLink to = '/login' ><button >login</button> </NavLink>
<NavLink to = '/register' ><button >register</button> </NavLink>

    </div>
</>    
  )
}

export default Welcome