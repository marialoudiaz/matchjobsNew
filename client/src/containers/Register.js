import React, { useState } from "react";
import {useParams, Link} from 'react-router-dom'
import axios from "axios";
import { URL } from "../config";
import Login from './Login';

function Register() {

  const [input, setInput] = useState({userName:'',password:''})
  const [userType, setUserType] = useState("")
  const [msg, setMsg]= useState('');

  // set input to name and password
  const getInput = (e)=>{
    setInput({...input, [e.target.name]: e.target.value})
  }

  const onOptionChange = e =>{
    setUserType(e.target.value)
  }

  const register = async()=>{
    
    // check type
    const temp = Object.entries(button).filter(c=>c[1]=== true)
    switch(temp[0][0]){


    // register controller depending on type`
      case 'recruiter':
        const recruiter = await axios.post(`${URL}/recruiter/register`,{userName:input.userName,password:input.password});
        if(recruiter.data.ok){
          setMsg(recruiter.data.message)
        }else{
          setMsg(recruiter.data.message)
        } 
        // pour le token
        loginFun(recruiter.data.token)
        break;


      case 'applicant':
        const applicant = await axios.post(`${URL}/applicant/register`,{username:input.userName,password:input.password});
          if(applicant.ok){
            setMsg(applicant.message)
          }else{
            setMsg(applicant.message)
          } 
          loginFun(applicant.data.token)
          break;
    }
  }

  return (

      <>
      <div>
      <h1>Create a new account</h1>
      <h3>already a member ?</h3> <NavLink to ='/login' ><button >Log in</button> </NavLink>

      <h1>Enter your username</h1>
      <input name = 'userName' onChange = {getInput}/>
      <h1>Enter your password</h1>
      <input name = 'password' onChange = {getInput}/>
      <h1>Confirm your password</h1>
      <input name = 'password2' onChange = {getInput}/>
      
      <h3>Are you looking for a new job or a new employee ?</h3>  
      <p>Tell us who you are</p>  
      {/* <input  name = 'user' value = 'recruiter' type = 'radio' onClick = {(e)=>getUser(e,"recruiter")}>Recruiter</input>
      <input  name = 'user' value = 'applicant' type = 'radio' onClick = {(e)=>getUser(e,"applicant")}>Applicant</input>
      <input  name = 'user' value = 'admin' type = 'radio' onClick = {(e)=>getUser(e,"admin")}>Admin</input> */}
      <button type="radio" name="usertype" value="Recruiter" id="recruiter" checked={userType === "Recruiter"} onChange={onOptionChange}>Recruiter</button>
      <button type="radio" name="usertype" value="Applicant" id="Applicant" checked={userType === "Applicant"} onChange={onOptionChange}>Applicant</button>
    <p>{msg}</p>
    <button onClick = {register}>register</button>
  
  </div>
    </>
    )
  }

export default Register


//////////// add to db corresponding values

// {/* // take the first entry from the only entry in temp which is the word of the key */}
//     const checkUser = Object.entries(userType).filter(c=>c[1]=== true)
    
//     switch(checkUser[0][0]){
//       case 'recruiter':
//         // comment différencier input username et input radio buttons
//         await axios.post(`${URL}/recruiter/addRecruiter`,{userName:input.userName,password:input.password});
//         break;
    
//       case 'applicant':
//        await axios.post(`${URL}/applicant/addApplicants/`,{userName:input.userName,password:input.password});
//        break;
//       /////////////// login to corresponding user  
//     }
//     <button onClick = {login}> Create my account </button>  
//   }


