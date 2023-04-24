import React, { useState,useEffect } from "react";
import axios from "axios";
import { URL } from "../config";
import {useParams, NavLink, useNavigate} from 'react-router-dom'
import * as jose from 'jose'


const Login = (props) => {

  // enregistre infos dans le formulaire
  const [form, setFormValues] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate()
  const [message, setMessage ] = useState('')
  const [userType, setUserType] = useState();

  // definir le type d'user
  const getUser = (e,type)=>{
    if(button === type) {
    setUserType("")
    } else {
    setUserType(type)
    } }


  // sauvegarder dans form les valeurs username et password
  const handleChange = (e) => {
    setFormValues({ ...form, [e.target.name]: e.target.value });
  };

    // gère ce qui est passé dans le formulaire 
    const handleSubmit = async (e) => {
    // evite disparaitre au re-render
    e.preventDefault();
    try {
      const response = await axios.post(`${URL}/users/login`, {
        // prend valeurs dans state component 'form'
        username: form.username.toLowerCase(),
        password: form.password,
      });
      // retourne le message de la DB
      setMessage(response.data.message);
      
      // si l'user existe
      if (response.data.ok) {
        // After login  : extract the username passed from the server inside the token 
        let decodedToken = jose.decodeJwt(response.data.token)
        // and now we now which user is logged in in the client so we can manipulate it as we want, like fetching data for it or we can pass the user role -- admin or not -- and act accordingly, etc...
        console.log("Email extracted from the JWT token after login: ", decodedToken.username)
        setTimeout(() => {
          props.login(response.data.token);
          navigate("/profile");
        }, 2000);
      }
    } catch (error) {
      console.log(error);
    }
  }
  };


  // based on type log on right profile
// en fonction valeur de form aller a telles routess
  return (
    <>
    <h1>Welcome back !</h1>
    <h3>Please enter your information to login in</h3>
    
    <form
    onSubmit={handleSubmit}
    onChange={handleChange}
    className='form_container'
    >
        <label>Username</label>
        <input name='userName'/>
        <label>Password</label>
        <input name='password'/>
        <label>I am a</label>
        <button disabled={button === "recruiter" ? true : false} name = 'user' value = 'recruiter' type = 'radio' onClick = {(e)=>getUser(e,"recruiter")}>Recruiter</button>
        <button disabled={button === "applicant" ? true : false} name = 'user' value = 'applicant' type = 'radio' onClick = {(e)=>getUser(e,"applicant")}>Applicant</button>
        <button  disabled={button === "admin" ? true : false}name = 'user' value = 'admin' type = 'radio' onClick = {(e)=>getUser(e,"admin")}>Admin</button>

        <div className="message">
        <h4>{message}</h4>
        </div>

        <button>login</button>
    </form>
    </>
   
 );

export default Login



    {/* <button  name='user' value = 'recruiter' type = 'radio' onClick = {(e)=>getUser(e,"recruiter")}>Recruiter</button>
    <button  name='user' value = 'applicant' type = 'radio' onClick = {(e)=>getUser(e,"applicant")}>Applicant</button>
    <button  name='user' value = 'admin' type = 'radio' onClick = {(e)=>getUser(e,"admin")}>Admin</button>
    
    <button onClick = {login}>login</button>
    </div> */}

{/* 
// passe la fonction pour le token
function Login({loginFun}) {
  const [input, setInput] = useState({userName:'',password:''})
  const [button,setButton] = useState("");
  const [msg, setMsg]= useState('');
  
  
  // getInput takes the data from the inputs and saves it in the input state variable
  const getInput = (e)=>{
    //setInput gets all data from input and changes the value of a certain key
    // e.target.name gets the name of the input
    // e.target.value gets input from input
    setInput({...input, [e.target.name]: e.target.value})
  }

  //getUser gets the information from the radio buttons and saves it in button
  const getUser = (e,type)=>{
    //setButton sets the user values
    // setting the keyvalue to the type of the user, and changing its value to the opposite of what it was before
    // take value of button (...) and change to the opposite (boolean) - current value - click - change value
    if(button === type) {
      setButton("")
          } else {
            setButton(type)
          }
        }

    const login = async()=>{
    //get entries of button in an array of arrays
    //filter out all the ones who have true as the value (only one)
    
    const temp = Object.entries(button).filter(c=>c[1]=== true)
    // take the first entry from the only entry in temp which is the word of the key
    switch(temp[0][0]){

      //check which value has been checked by the button
      // calling the back end and using the corresponding controller
      //check if true and send the corresponding message (backend)
      case 'recruiter':
        const recruiter = await axios.post(`${URL}/recruiter/login`,{userName:input.userName,password:input.password});
       ''
        if(recruiter.data.ok){
          setMsg(recruiter.data.message)
        }
        else{
          setMsg(recruiter.data.message)
        } 
        // pour le token
        loginFun(recruiter.data.token)
        break;
          case 'applicant':
            const applicant = await axios.post(`${URL}/applicant/login`,{username:input.userName,password:input.password});
            if(applicant.ok){
              setMsg(applicant.message)
            }
            else{
              setMsg(applicant.message)
            } 
            loginFun(applicant.data.token)
            break;
          case 'admin':
            const admin = await axios.post(`${URL}/admin/login`,{username:input.userName,password:input.password});
            if(admin.ok){
              setMsg(admin.message)
            }
            else{
              setMsg(admin.message)
            } 
            loginFun(admin.token)
            break;
  
    }
  } */}