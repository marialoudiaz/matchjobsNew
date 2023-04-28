import React, { useState, useEffect} from 'react';
import { useNavigate, useParams, Link, Navigate } from "react-router-dom";
import axios from 'axios';
import {URL} from "../config"



function ProfileRecruiter({user}) {

  // passer l'id
  const params = useParams()
  console.log("id from params",params.id)
  let id = params.id
  console.log(user)
  // l'id a l'id de l'user



  // the application to be displayed
  const [myOffer, setmyOffer]=useState(null)

  // the state components to create an offer
  const [companyName, setCompanyName]= useState('')
  const [jobTitle, setJobTitle]= useState('')
  const [jobFields, setJobFields]= useState('')
  const [remote, setRemote]= useState('') // remote - onSite - flexible
  const [onSite, setOnSite]= useState('') // remote - onSite - flexible
  const [flexible, setFlexible]= useState('') // remote - onSite - flexible
  const [minPrice, setMinPrice]=useState(0)
  const [maxPrice, setMaxPrice]=useState(0)
  const [location, setLocation]= useState('')
  const [jobDescription, setjobDescription]= useState('')
  const [softSkills, setSoftSkills]= useState([])
  const [hardSkills, setHardSkills]= useState([])
  const [languagesSpoken, setLanguagesSpoken]= useState([])
  const [msg, setMsg]= useState('')
// dans les arrays je passerai divers strings


// offerInfosChange - actualiser les infos dans les states components
const offerInfosChange = e=>{
  debugger
  if (e.target.name=== 'companyName'){ 
    setCompanyName(e.target.value) 
  }else if (e.target.name=== 'jobTitle'){ 
    setJobTitle(e.target.value)
  } else if (e.target.name=== 'jobField'){
    setJobFields(e.target.value)
  } else if(e.target.name=== 'minprice'){
    setMinPrice(e.target.value)
  } else if(e.target.name=== 'maxprice'){
    setMaxPrice(e.target.value)
  } else if(e.target.name=== 'location'){
    setLocation(e.target.value)
  } else if(e.target.name=== 'jobDescription'){
    setjobDescription(e.target.value)
  } else if(e.target.name=== 'softSkills'){
    setSoftSkills(e.target.value)
  } else if(e.target.name=== 'hardSkills'){
    setHardSkills(e.target.value)
  } else if(e.target.name=== 'languages'){
    setLanguagesSpoken(e.target.value)
  }
}


{/* <input type='radio' name='mobility' value = 'remote' onClick = {flexibilityChange} />
 value = 'onSite' onClick = {flexibilityChange} />
value = 'flexible' onClick = {flexibilityChange} /> */}



// // true/false - flexibility button
// // met dans le state component un des trois en string
// const mobilityChange = e => {
//   setMobility(e.target.value)
//   // si value = blabla assigne mobility to blabla
// }


  // handleApp
     // const id = user._id;
     const handleOffer = async ()=>{
      debugger
      try {
          let allMyOffer = await axios.get(`${URL}/recruiter/getAllMyJobOffers/${id}`)
          console.log(allMyOffer);
          setmyOffer(allMyOffer.data.data) 
      } catch (error) {
          console.log(error);
    }}

//handleSubmit - creer loffre
const handleSubmit = async(e)=>{
  e.preventDefault();
  debugger
  try {
    const create = await axios.post(`${URL}/recruiter/addJobOffer`,{companyName, jobTitle, remote, onSite, flexible, minPrice, maxPrice,location, jobDescription, softSkills, hardSkills,jobFields,languagesSpoken, email: user.email })
    console.log(create)
    if (create.data.ok){
      console.log(create.data.message)
      setMsg(create.data.message)
    } else {
      console.log(create.data.message)
      setMsg(create.data.message)
    }
  } catch (error) {
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
      {console.log(myOffer)}
      {!myOffer
      ? 
      <> <div className='card'>
        <div className='top-card'></div>
        {/* <div className='inside-card'><p onClick= {<Navigate to={'/recruiter/${user._id}/view'}/>}>Create a new offer</p></div> */}
       
       {/* // le formulaire avec toutes les inputs a envoyer dans DB */}
        <form onSubmit={handleSubmit}>

        </form>
        <label>Company Name</label>
        <input name='companyName' onChange={offerInfosChange}></input>
        <label>Job Title</label>
        <input name='jobTitle'onChange={offerInfosChange}></input>
        <label>Job Field</label>
        <input name='jobField'onChange={offerInfosChange}></input>
        
        {/* <input type='radio' name='mobility' value = 'remote' onClick = {flexibilityChange} />
        <label htmlFor='remote'>Remote</label>
        <input type='radio' name='mobility' value = 'onSite' onClick = {flexibilityChange} />
        <label htmlFor='onSite'>on site</label>
        <input type='radio' name='mobility' value = 'flexible' onClick = {flexibilityChange} />
        <label htmlFor='flexible'>Flexible</label> */}

        <label>Min Price</label>
        <input name='minprice'onChange={offerInfosChange}></input>
        <label>Max Price</label>
        <input name='maxprice'onChange={offerInfosChange}></input>

        <label>Location</label>
        <input name='location'onChange={offerInfosChange}></input>
        <label>Job Description</label>
        <input name='jobDescription'onChange={offerInfosChange}></input>

        <label>Soft Skills</label>
        <input name='softSkills'onChange={offerInfosChange}></input>

        <label>Hard Skills</label>
        <input name='hardSkills'onChange={offerInfosChange}></input>

        <label>Languages</label>
        <input name='languages'onChange={offerInfosChange}></input>
        <p>{msg}</p>
        <button className='btn' >Create offer</button>
     </div>

      <h3>you don't have any application created yet</h3><p>all your app will be displayed here</p></>
    
    
       
   
   
   
   
   
   
   
   
   :

// Version avec les offres affichées
      
      <div className='classicPage'>
          

          {/* // applications created */}
          <div className='topTitle'>
          {myOffer.map(c =>( <h2>Hello {c.companyName},</h2> ))}
          <h2>Welcome back</h2>
          </div>
          
          <div className='jobApplication'>
          {myOffer.map(c =>( 
        <>
        {/* <Link to = {`/${type}/view/${c._id}`}> */}
        <h3 >{c.companyName}</h3>
        <h4 >{c.jobTitle}</h4>
      
        <p >{c.jobFields}</p>
       
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
         <button  onClick= {() => Navigate(`/applicant/view/${id}`)}>view</button>

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