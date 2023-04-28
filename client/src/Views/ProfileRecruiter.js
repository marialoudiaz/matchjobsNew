import React, { useState, useEffect} from 'react';
import { useNavigate, useParams, Link, Navigate } from "react-router-dom";
import axios from 'axios';
import {URL} from "../config"


function ProfileRecruiter(props) {

  let navigate = useNavigate();

  // passer l'id
  const params = useParams()
  console.log("id from params",params.id)
  let id = params.id
console.log("props", props)
  // the props I pass
  console.log("user Email", props.user)

  // l'ID a l'id de l'user
  const [msg, setMsg]= useState('')

  // the application to be displayed
  const [myOffer, setmyOffer]=useState(null)
  
  // la nouvelle offre créée
  const [myNewOffer, setmyNewOffer]=useState({
    companyName: "",
    jobTitle:"",
    jobFields:"",
    remote:"",
    onSite:"",
    flexible:"",
    minPrice: "",
    maxPrice: "",
    location: "",
    jobDescription: "",
    softSkills: [],
    hardSkills: [],
    jobFields: "",
    languagesSpoken: [], 
}) 

//handleChange du form- pour les inputs
const handleChange = async (event)=>{
 const name= event.target.name;
 const value= event.target.value;
 setmyNewOffer({...myNewOffer, [name]: value});
}

//handleSubmit - creer loffre
const handleSubmit = async(e)=>{
  e.preventDefault();
  debugger
  try {
    const create = await axios.post(`${URL}/recruiter/addJobOffer`,{...myNewOffer, email:props.user})
    console.log(create)
    if (create.data.ok){
      console.log(create.data.message)
      setMsg(create.data.message)
    } else {
      console.log(create.data.message)
      setMsg(create.data.message)
    }
  } catch (error) {
  }}


// handleApp
    // const id = user._id;
     const handleOffer = async ()=>{
      try {
          let allMyOffer = await axios.get(`${URL}/recruiter/getAllMyJobOffers/${id}`)
          setmyOffer([allMyOffer.data.data]) 
      } catch (error) {
          console.log(error);
    }
  }



 // render the applications every render
    useEffect(()=>{
      handleOffer();
    },[])




  return (
    <div className='page-wrapper'>
    <div className='InitalPage'>
        {/* <h1>Hello {email}</h1> */}
      
      {!myOffer
      ////////////////// IF CONDITION
      
      ? 
      <> <div className='card'>
        <div className='top-card'></div>
        {/* <div className='inside-card'><p onClick= {<Navigate to={'/recruiter/${user._id}/view'}/>}>Create a new offer</p></div> */}
       
       {/* // le formulaire avec toutes les inputs a envoyer dans DB */}

        <form onSubmit= {handleSubmit} onChange={handleChange}>
 
        <label>Company Name</label>
        <input name='companyName' value={myNewOffer.companyName}/>
        <label>Job Title</label>
        <input name='jobTitle' value={myNewOffer.jobTitle}/>
        <label>Job Field</label>
        <input name='jobFields' value={myNewOffer.jobFields}/>

        <label>Remote</label>
        <input type='radio' name='mobility' value={myNewOffer.remote}/>
        <label>On Site</label>
        <input type='radio' name='mobility' value={myNewOffer.onSite}/>
        <label>Flexible</label>
        <input type='radio' name='mobility' value={myNewOffer.flexible}/>

        <label>Min Price</label>
        <input name='minPrice' value={myNewOffer.minPrice}/>
        <label>Max Price</label>
        <input name='maxPrice' value={myNewOffer.maxPrice}/>
        <label>Location</label>
        <input name='location'  value={myNewOffer.location} />
        <label>Job Description</label>
        <input name='jobDescription'   value={myNewOffer.jobDescription} />

        <label>Soft Skills</label>
        <input name='softSkills' value={myNewOffer.softSkills} />

        <label>Hard Skills</label>
        <input name='hardSkills' value={myNewOffer.hardSkills} />

        <label>Languages</label>
        <input name='languagesSpoken' value={myNewOffer.languagesSpoken}/>
        <button className='btn'>Create offer</button>
        <p>{msg}</p>
        </form>
     </div>

      <h3>you don't have any application created yet</h3><p>all your app will be displayed here</p></>
    
    
    ////////////////// ELSE CONDITION
   
    :

// Version avec les offres affichées
      
      <div className='classicPage'>
          {/* // applications created */}
          <div className='topTitle'>
          {myOffer.map(c =>( 
          <h2>Hello {c.companyName},</h2> ))}
          <h2>Welcome back</h2>
          </div>
          
          <div className='jobApplication'>
          {myOffer.map(c =>(
        <>
        {/* <Link to = {`/${type}/view/${c._id}`}> */}
        <h3>{c.companyName}</h3>
        <h4>{c.jobTitle}</h4>
        <p>{c.jobFields}</p>
        {c.remote ?  <div className='chip'>remote</div> : <div></div> }
        {c.onSite ? <p>onSite</p> : <p></p> }
        {c.flexible ? <p>Flexible</p> : <p></p> }
        <p className='location'>{c.location}</p>
        <h4 className='jobDescription'>Job Description</h4>
        <p>{c.jobDescription}</p>       
        <h4>Skills</h4>
        <h4>Soft</h4>
        <p>{c.softSkills}</p>
        <h4>Hard</h4>
        <p>{c.hardSkills}</p>
        <h4>Languages</h4>
        <p>{c.languagesSpoken}</p>         
        {/* <button  onClick= {() => navigate(`/applicant/edit/${id}`)}>edit</button> */}
         <button onClick= {()=>navigate(`/recruiter/${id}/view`)}>view</button>
        </>
      ))}
      </div> 
     </div>
    }
    </div>
  </div>
  )
}

export default ProfileRecruiter


// button view => render view
// button edit => render edit
// button delete => call controller delete


