import React, { useState, useEffect} from 'react';
import { useNavigate, useParams, Link, Navigate } from "react-router-dom";
import axios from 'axios';
import {URL} from "../config"
import { FaMailBulk } from 'react-icons/fa';
import '/Users/mariadiaz/Documents/BCS/matchjobs/matchjobs/client/src/App.css';

function MatchesRecruiter(props) {

const params = useParams()
console.log("id from params",params.id);  // applicantId
let id = params.id;
let recruitersId = id;
let likers ='';
let appIdEmail='';
let emailtoemail='';
console.log("user email", props.user);
const [likeApp, setLikeApp]=useState(null);
const [matchApp, setMatchApp]=useState(null);
const [alert,setAlert]=useState('');


const handleLikes = async ()=>{
  try {
    let allMyLikes = await axios.get(`${URL}/recruiter/getLikedBy/${recruitersId}`)
    console.log('allMyLikes',allMyLikes); // retourne an array with all objects (offers) inside
    if (Array.isArray(allMyLikes.data.data) && allMyLikes.data.data.length === 0) {
      setLikeApp(null)
    }else{
      setLikeApp(allMyLikes.data.data)
    }
  } catch (error) {
    console.log(error);
  }}


  const handleMatch = async ()=>{
    console.log('recruitersId in matches', recruitersId)
    try {
      let allMyMatches = await axios.get(`${URL}/recruiter/getMatchWith/${recruitersId}`)
      console.log('allMyMatches',allMyMatches); // retourne an array with all objects (offers) inside
      console.log('allMyMatches',allMyMatches.data.data)
      setMatchApp(allMyMatches.data.data)
    } catch (error) {
      console.log(error);
    }
  }

  // Fonction pour matcher (envoyer mon id dans matchWith)
  const doMatch = async(props)=>{
    let appId = props
    console.log('id', id); //------ userID
    console.log('appId',appId); //------ offerID
  try {
    let doMatch = await axios.post(`${URL}/recruiter/addMatchWith`, {id,appId})
    console.log('doMatch',doMatch)
    setAlert('Its a match!')
  } catch (error) {
  }
}

const getEmail = async(props)=>{
  let appIdEmail = props
  console.log('offerID', appIdEmail)
  try {
    let getEmail = await axios.post(`${URL}/recruiter/getEmail/`, {appIdEmail})
    console.log('email to email',getEmail.data.data)
    emailtoemail= getEmail.data.data
    {window.open(`mailto:${emailtoemail}?subject=We%20just%20matched%20&body=Type%20in%20..`) }
  } catch (error) {
  }
}

const deleteLikes = async (appID)=>{
  let userId = recruitersId;
  let appDeleteId = appID;
  console.log('userId',userId)
  console.log('appDeleteId',appDeleteId)
try {
  let unlikeApp = await axios.post(`${URL}/recruiter/deleteLikedBy`,{userId, appDeleteId} )
  console.log('unlikeApp',unlikeApp)    
} catch (error) { }
}

// Fonction pour supprimer un match (enlever mon id de matchWith)
const deleteMatches = async (props)=>{
  let userId = id; // id user connecté
  let appDeleteId = props; // id de l'offre
  try {
    let unMatchApp = await axios.post(`${URL}/recruiter/deleteMatchWith`,{userId, appDeleteId} ) 
    console.log('unMatchApp',unMatchApp)
    setAlert('Match deleted !')    
  } catch (error) {
  }
}

  //A Chaque Render
  useEffect(()=>{
    handleLikes();
    handleMatch();
  },[])


  return (
    <>
    <div>
      {!likeApp
        ?(
          <>
            <h1>You don't have any likes, yet.</h1>
            <h4>Keep chasing!</h4>
          </>
        ):(
          <>
           <div className='likeOffer'>
              <h2>Here are the applicants who liked you so far !</h2>
              <div className="classicPage">
              <div className="topTitle">
              <div className="jobApplication">

              {likeApp.map((c)=>(
                <>
                 <h3>{c.jobTitle}</h3>
                 <p>{c.jobFields}</p>
                 {c.remote ? <div className="chip">remote</div> : <div></div>}
                 {c.onSite ? <p>onSite</p> : <p></p>}
                 {c.flexible ? <p>Flexible</p> : <p></p>}
                 <p className="location">{c.location}</p>
                 <h4 className="jobDescription">Bio</h4>
                 <p>{c.bio}</p>
                 <h4>Skills</h4>
                 <h4>Soft</h4>
                 <div className='transparent'>{c._id}</div>
                 <div className="flex">
                 {Object.keys(c.softSkills).map((key) => ( <p className="inputArray">{c.softSkills[key]}</p> ))}
                 </div>
                 <h4>Hard</h4>
                 <div className="flex">
                 {Object.keys(c.hardSkills).map((key) => (<p className="inputArray">{c.hardSkills[key]}</p> ))}
                 </div>
                 <h4>Languages</h4>
                 <div className="flex">
                 {Object.keys(c.languagesSpoken).map((key) => (<p className="inputArray">{c.languagesSpoken[key]}</p>))}
                 <button className='btn' onClick={() => deleteLikes(c._id)}> Delete like </button>
                 <button className='btn' onClick={() => doMatch(c._id)}> Match with applicant </button> 
                 </div>
                 <div><p>{alert}</p></div>
                 </>
              ))}
                  </div>
                </div>
              </div>
            </div>
           </>
          )}
        </div>
      <>
      {!matchApp
        ? (
          <>
            <h2>You don't have any matches, yet.</h2>
            <h4>Keep chasing !</h4>
          </>
        )
        :
        (
          <>
            <h2>Here are your matches</h2>
              <div className='matchOffer'>
              <div className="classicPage">
              <div className="topTitle">
              <div className="jobApplication">
                {console.log(matchApp)}
                {matchApp.map((d)=>(
            <>
                <h3>{d.jobTitle}</h3>
                  <p>{d.jobFields}</p>
                    {d.remote ? <div className="chip">remote</div> : <div></div>}
                    {d.onSite ? <p>onSite</p> : <p></p>}
                    {d.flexible ? <p>Flexible</p> : <p></p>}
                  <p className="location">{d.location}</p>
                  <h4 className="jobDescription">Bio</h4>
                  <p>{d.bio}</p>
                  <h4>Skills</h4>
                  <h4>Soft</h4>
                  <div className="flex">{Object.keys(d.softSkills).map((key) => (<p className="inputArray">{d.softSkills[key]}</p>))} </div>
                  <h4>Hard</h4>
                  <div className="flex">{Object.keys(d.hardSkills).map((key) => (<p className="inputArray">{d.hardSkills[key]}</p>))}</div>
                  <h4>Languages</h4>
                  <div className="flex">{Object.keys(d.languagesSpoken).map((key) => (<p className="inputArray">{d.languagesSpoken[key]}</p>))}</div> 
                  <div className='transparent'>{appIdEmail = d._id}</div>
                  <button className='btn' onClick={() => deleteMatches(d._id)}> Delete Match </button>
                  <div><FaMailBulk onClick={() => getEmail(d._id)}/>Get in touch</div>
            </>
        ))}
                </div>
              <div><p>{alert}</p></div>
            </div>
          </div>
        </div>
      </>
    )}
  </> 
</>
)}
export default MatchesRecruiter

// // THE APPS TO RENDER
// // Je mets dans myMatchApp les infos des likers (applicants.id)
// const [myMatchApp, setmyMatchApp]=useState([])

// // HOW TO GET THE APP TO RENDER 
//      const handleApp = async ()=>{
//       debugger
//       try {
//           let allMyApp = await axios.get(`${URL}/recruiter/getAllMatch/${id}`)
//           console.log(allMyApp);
//           setmyMatchApp(allMyApp.data.data) // [{},{}.....]
//       } catch (error) {
//           console.log(error);
//       }}
// //AT EVERY RENDER
// useEffect(()=>{
//   handleApp();
// },[]) 