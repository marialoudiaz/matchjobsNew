import React, { useState,useEffect } from "react";
import {useParams} from 'react-router-dom'
import axios from "axios";
import { URL } from "../config";
import Edit from './Edit';



const Profile = ()=>{


    const {type,id} = useParams()
    
    const [mySheets,setMySheets] = useState('')



    // empty new greyish jobapplication example
    // map through all jobapplications of this applicant

    // const id = user._id;
    const handleSheets = async ()=>{
        let allMySheets = [];
        if(type === 'recruiter'){
            allMySheets = await axios.get(`/${URL}/recruiter/getAllMyJobOffers/?id=${id}`)

        }
        else{
            allMySheets = await axios.get(`/${URL}/applicant/getAllMyJobApplications/?id=${id}`)
        }
       
        setMySheets(allMySheets)

    }
   
    useEffect(()=>{
        handleSheets();
    })



    return(<>
    {type === 'recruiter' ? <h1>Add your job offer</h1> : <h1>Add your application</h1> }
    <p> location icon and location</p>
    <p>min salary</p>
    <p>max salary</p>
    <h2>Skills</h2>
    <p>job Field</p>
    <h3>Soft</h3>

    <h3>Hard</h3>

    <button onClick = {() => < Edit type = {type} id = ''/>}>edit</button>
    <button>activate</button>

    {mySheets.map(c =>{return( 
        <>
        <Link to = {`/${type}/view/${c._id}`}>
        
        <h1>{c.jobTitle}</h1>
        <p>{c.location}</p>
        <p>{c.minPrice}</p>
        <p>{c.maxPrice}</p>
        <h2>Skills</h2>
        <p>{c.jobFields}</p>
        <h3>Soft</h3>
        <p>{c.softSkills}</p>
        <h3>Hard</h3>
        <p>{c.hardSkills}</p>
        <button onClick = {() => < Edit type = {type} id = {c._id}/>}>edit</button>
        <button onClick = {()=> c.active = !c.active}>activate</button>
        </Link>
        </>
    )} 

    )}
    </>)

}
export default Profile