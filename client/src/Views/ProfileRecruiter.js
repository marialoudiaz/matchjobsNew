import React, { useState, useEffect} from 'react';
import { useNavigate, useParams, Link, Navigate } from "react-router-dom";
import axios from 'axios';
import {URL} from "../config"



function ProfileRecruiter(user) {

  // passer l'id
  const params = useParams()
  console.log("id from params",params.id)
  let id = params.id
  // l'id a l'id de l'user

  // the application to be displayed
  const [myOffer, setmyOffer]=useState(null)


  // handleApp
     // const id = user._id;
     const handleOffer = async ()=>{
      debugger
      try {
          let allMyOffer
          allMyOffer = await axios.get(`${URL}/recruiter/getAllMyJobOffers/${id}`)
          console.log(allMyOffer);
          setmyOffer(allMyOffer.data.data) 
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
    
    
    {!myOffer ? 
    <> <div className='card'>
    <div className='top-card'></div>
    {/* <div className='inside-card'><p onClick= {<Navigate to={'/recruiter/${user._id}/view'}/>}>Create a new offer</p></div> */}
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
{/*         
        <button  onClick= {() => navigate(`/applicant/edit/${id}`)}>edit</button>
         <button  onClick= {() => navigate(`/applicant/view/${id}`)}>edit</button>
        <button onClick = {()=> c.active = !c.active}>activate</button> */}
        {/* </Link> */}
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