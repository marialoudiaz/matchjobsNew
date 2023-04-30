import React, { useState, useEffect} from 'react';
import { useNavigate, useParams, Link, Navigate } from "react-router-dom";
import axios from 'axios';
import {URL} from "../config"


function EditRecruiter(props) {

// passer l'id
const params = useParams()
console.log("id from params",params.id)

//id of jobapplication// id du recruiter
let id =params.id


// l'ID a l'id de l'user
const [msg, setMsg]= useState('')


// the state component in full size
const [myEdit, setmyEdit]=useState(null)

// la nouvelle offre
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

// une fonction qui change les informations de myNeOffer
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

// // Appeler le controller create
// const replaceData = async ()=>{
//   try {
//     let updateData = await axios.post(`${URL}/recruiter/addJobOffer/${id}`) // 
//     console.log(singleJob);
//     singleJob.data.ok && setmyEdit(singleJob.data.data) // {} // on assigne les données a setmyEdit
// } catch (error) {
//     console.log(error);
// }}   


// Fetch les données à mettre dans les placeholders (ancienne offre)
     // const id = user._id;
     const fetchPrevData = async ()=>{
      debugger
      try {
          let singleJob = await axios.get(`${URL}/recruiter/getJobOffer/${id}`) // 
          console.log(singleJob);
          singleJob.data.ok && setmyEdit(singleJob.data.data) // {} // on assigne les données a setmyEdit
      } catch (error) {
          console.log(error);
      }}


//At every render
useEffect(()=>{
  fetchPrevData();
},[]) 




//////////////////////////////////////////// RETURN  //////////////////////////////////////////////////////////



// map les elements de la card passé en props pr pouvoir passé ce quil n'y a pas dans preview => dans placeholders
  return (
    <>

      {myEdit && <div className='jobApplication'>
    <form onSubmit= {handleSubmit} onChange={handleChange}>

      
       <label>Company Name</label>
       <input type='text' name='companyName' value='companyName' placeholder={myEdit.companyName}/>
       
       <label>Job Title</label>
       <input type='text' name='jobTitle' value='jobTitle' placeholder={myEdit.jobTitle}/>

       <label>Location</label>
       <input type='text' name='location' value='location' placeholder={myEdit.jobTitle}/>

       <label>Location</label>
       <input type='text' name='location' value='location' placeholder={myEdit.jobTitle}/>

       <label>Mobility</label>
       <input type='radio' name='mobility' value='remote' placeholder={myEdit.remote}/>
       <input type='radio' name='mobility' value='onSite' placeholder={myEdit.onSite}/>
       <input type='radio' name='mobility' value='flexible' placeholder={myEdit.flexible}/>

       <label>Job Description</label>
       <input type='text' name='jobDescription' value='jobDescription' placeholder={myEdit.bio}/>
       
       <label>Skills</label>
       <p>Soft Skills</p>
       <input type='text' name='softSkills' value='softSkills' placeholder={myEdit.softSkills}/>

       <p>Hard Skills</p>
       <input type='text' name='hardSkills' value='hardSkills' placeholder={myEdit.hardSkills}/>
      
       <label>Languages</label>
       <input type='text' name='languagesSpoken' value='languagesSpoken' placeholder={myEdit.languagesSpoken}/>

    </form>
      </div>
       }
      
      
    </>
  )
}

export default EditRecruiter