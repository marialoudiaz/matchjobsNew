import React, { useState, useEffect} from 'react';
import { useNavigate, useParams, Link, Navigate } from "react-router-dom";
import axios from 'axios';
import {URL} from "../config"


function EditRecruiter(props) {

  let navigate = useNavigate();
  // 1 - passer l'id de l'user
  const params = useParams();
  console.log("id user", params.id); //object id de l'user ( et non l'offre)
  let id = params.id;

  const [msg, setMsg]= useState('');

  // the state component in full size
  const [myEdit, setmyEdit]=useState(null)
  console.log('myEdit', myEdit)
  var offerID = '';

  const [skill, setSkill] = useState("");

  const handleChange = async (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setmyEdit({ ...myEdit, [name]: value });
  };


// Fetch les données à mettre dans les placeholders (ancienne offre)
     // const id = user._id;
     const fetchPrevData = async ()=>{
      try {
          let singleJob = await axios.get(`${URL}/recruiter/getJobOffer/${id}`) // 
          console.log(singleJob);
          singleJob.data.ok && setmyEdit(singleJob.data.data) // {} // on assigne les données a setmyEdit
          offerID= myEdit._id
         console.log('offerID',offerID)
      } catch (error) {
          console.log(error);
      }}



//handleSubmit - creer loffre
const handleSubmit = async (e) => {
  debugger
  console.log('props.user', props.user)
  offerID = myEdit._id
  e.preventDefault();
  try {
    const update = await axios.post(`${URL}/recruiter/updateJobOffer`, {offerID,myEdit}); // je passe nouvelle offre, ancienne offre + id de l'offre
    console.log(update);
    if (update.data.ok) {
      console.log(update.data.data);
      setMsg(update.data.data);
    } else {
      console.log(update.data.data);
      setMsg(update.data.data);
    }
  } catch (error) {}
};


// Change nimporte quel array basé sur l'argument passé (la valeur)
  // update l'état du form avec la valeur de la skill à l'intérieur d'un certain array
  const handleChangeSkills = (event) => {
    setSkill(event.target.value);
  };

  // handleSkills - ajouter les skills a l'array
  const handleSkills = (changed) => {
    setmyEdit({
      ...myEdit,
      [changed]: [...myEdit[changed], skill],
    });
    setSkill("");
  };


//At every render
useEffect(()=>{
  fetchPrevData();
},[]) 




//////////////////////////////////////////// RETURN  //////////////////////////////////////////////////////////
return (
    <>
      {myEdit && <div className='jobApplication'>
    <form onSubmit= {handleSubmit}>
      
       <label>Company Name</label>
       <input type='text' name='companyName' value={myEdit.companyName} placeholder={myEdit.companyName}  onChange={handleChange}/>
       
       <label>Job Title</label>
       <input type='text' name='jobTitle' value={myEdit.jobTitle} placeholder={myEdit.jobTitle}  onChange={handleChange}/>

       <label>Job Field</label>
       <input type='text' name='jobFields' value={myEdit.jobFields} placeholder={myEdit.jobFields} onChange={handleChange}/>

       <label>Location</label>
       <input type='text' name='location' value={myEdit.location} placeholder={myEdit.jobTitle} onChange={handleChange}/>

       <label>Mobility</label>
       <p>Remote</p>
       <input type='radio' name='mobility' value={myEdit.remote} placeholder={myEdit.remote} onChange={handleChange}/>
       <p>On Site</p>
       <input type='radio' name='mobility' value={myEdit.onSite} placeholder={myEdit.onSite} onChange={handleChange}/>
       <p>Flexible</p>
       <input type='radio' name='mobility' value={myEdit.flexible} placeholder={myEdit.flexible} onChange={handleChange}/>

       <label>Job Description</label>
       <input type='text' name='jobDescription' value={myEdit.jobDescription} placeholder={myEdit.bio} onChange={handleChange}/>
       
       <label>Skills</label>
       <p>Soft Skills</p>
       <input type='text' name="temporarySoft"  placeholder={myEdit.softSkills} onChange={handleChangeSkills} />
       <button type="button" onClick={() => handleSkills("softSkills")} className="btn">Add Skill</button>
       
       <p>Hard Skills</p>
       <input type='text'  name="temporaryHard"  placeholder={myEdit.hardSkills} onChange={handleChangeSkills} />
       <button type="button" onClick={() => handleSkills("hardSkills")} className="btn">Add Skill</button>
       
       <label>Languages</label>
       <input type='text' name="temporaryLanguage"  placeholder={myEdit.languagesSpoken} onChange={handleChangeSkills} />
       <button type="button" onClick={() => handleSkills("languagesSpoken")} className="btn">Add Languages</button>
       <button type="submit" className="btn">Create offer</button>
       <p>{msg}</p>
    </form>
      </div>
       }
      
      
    </>
  )
}

export default EditRecruiter