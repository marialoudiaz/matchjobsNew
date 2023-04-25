import React, { useState} from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import {URL} from "../config"
import App from '../App.css'
import * as jose from 'jose'

function Register(props) {
  let navigate = useNavigate();

  const [userEmail, setUserEmail]=useState(null)
  const [userPass, setUserPass]=useState(null)
  const [userPass2, setUserPass2]=useState(null)
  const [userType, setUserType]=useState(null)
  const [msg, setMsg]=useState(null)
  console.log(userEmail,userPass,userPass2, userType)

const userInfosChange = e=>{
  if (e.target.name=== 'email'){
    setUserEmail(e.target.value)
  }else if (e.target.name==='password'){
    setUserPass(e.target.value) 
  }else{
    setUserPass2(e.target.value) 
}}

  const usertypeChange = e => {
    setUserType(e.target.value)
  }


  const handleSubmit = e => {
    debugger
    e.preventDefault();
    if (userType==='applicant'){
      let url = `${URL}/applicant/register`;
      axios.post(url, {email: userEmail, password:userPass, password2: userPass2})
      .then((res)=>{
        //return <Navigate replace to={`/applicant/${id}`} />;
        console.log(res.data.message)
        if (res.data.ok){
          let decodedToken = jose.decodeJwt(res.data.token)
          localStorage.setItem('token', res.data.token)
          setTimeout(()=>{
            props.login(res.data.token)
            navigate(`/applicant/${decodedToken._id}`)
          })
        }else{
        setMsg(res.data.message)
        }
        
        // let { name } = res.data;
        // this.setState({name})
      }).catch((error)=>{
          debugger
      })
    }else{
      let url = `${URL}/recruiter/register`;
      axios.post(url, {email: userEmail, password:userPass, password2: userPass2})
      .then((res)=>{
        //  navigate({`/recruiter/${id}`}) />;
          if (res.data.ok){
            let decodedToken = jose.decodeJwt(res.data.token)
            localStorage.setItem('token', res.data.token)
            setTimeout(()=>{
              props.login(res.data.token)
              navigate(`/recruiter/${decodedToken._id}`)
            })
          }else{
          setMsg(res.data.message)
          }
      }).catch((error)=>{debugger})
    }}

  // condition
  // if axios request is successfull go to profile page of id
  

  return (
    <>
  <form className='form' onSubmit={handleSubmit}>
    <h1> Create a new account</h1>
    <h4 className='links' onClick={() => navigate("/login")}>already a member? Login </h4>
    <label>email</label>
    <input className='inputs' name='email' type='email' onChange={userInfosChange}></input>
    <label>password</label>
    <input className='inputs' name='password' type='password' onChange={userInfosChange}></input>
    <label>password 2</label>
    <input className='inputs' name='password2' type='password' onChange={userInfosChange}></input>

    <label>please select the type of user you are </label>
    <div className='radiobtn-container'>
            <input className='radio' type='radio' name='user' value = 'recruiter' onClick = {usertypeChange} />
            <label htmlFor='recruiter'>Recruiter</label>
            <input className='radio' type='radio' name='user' value = 'applicant' onClick = {usertypeChange} />
            <label htmlFor='applicant'>Applicant</label>
    </div>
    <button className='btn' >create account</button>
    <p className={msg !== null ? 'msg' : 'none'} >{msg}</p>
  </form>
    </>
  )
}

export default Register