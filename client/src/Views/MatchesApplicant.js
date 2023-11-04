import React, { useState, useEffect} from 'react';
import { useNavigate, useParams, Link, Navigate } from "react-router-dom";
import axios from 'axios';
import {URL} from "../config"
import { FaEnvelope } from 'react-icons/fa';
import { FaLocationArrow } from "react-icons/fa";
import '../App.css';
// import { addMatchWith } from '../../../server/controllers/applicantsControllers';

function MatchesApplicant(props) {
  // Prendre id de ceux qui likent
  const params = useParams()
  console.log("id from params",params.id)  // recruiterId
  let id = params.id
  let applicantsId = id // User connecté (son id)

  // Variable utilisée dans getEmail
  let offerIdEmail=''
  //Variable for email to email
  let emailtoemail=''
  // 2 - the props I pass - Email of user
  console.log("user email", props.user);
// créer un state component (likeOffer) pour stocker les likes que j'ai recu
  const [likeOffer, setLikeOffer]=useState(null)
// créer un state component (matchOffer) pour stocker les matchs (ceux qui m'ont liké et que j'ai liké en retour)
  const [matchOffer, setMatchOffer]=useState(null)
  const [alert,setAlert]=useState('')

// Render les likes que j'ai recu
  // Render les likes que j'ai recu
const handleLikes = async ()=>{
  try {
    let allMyLikes = await axios.get(`${URL}/applicant/getLikedBy/${applicantsId}`)
    console.log('allMyLikes',allMyLikes); // retourne an array with all objects (offers) inside
    if (Array.isArray(allMyLikes.data.data) && allMyLikes.data.data.length === 0) {
      setLikeOffer(null)
    }else{
      setLikeOffer(allMyLikes.data.data)
    }
  } catch (error) {
    console.log(error);
  }}


  //Render ce que j'ai liké en retour - Mes matchs
  //add to my matchWith the offers_id when i click on match button
  const handleMatch = async ()=>{
    console.log('applicantsId in matches', applicantsId)
    try {
      let allMyMatches = await axios.get(`${URL}/applicant/getMatchWith/${applicantsId}`)
      console.log('allMyMatches',allMyMatches); // retourne an array with all objects (offers) inside
      console.log('allMyMatches',allMyMatches.data.data)
      setMatchOffer(allMyMatches.data.data)
    } catch (error) {
      console.log(error);
    }
  }

  // // Fonction pour matcher (envoyer mon id dans matchWith)
    const doMatch = async(props)=>{
      let offerId = props
      console.log('id', id); //------ userID
      console.log('offerId',offerId); //------ offerID
    try { //Requête post - (addMatchWith)
      // const create = await axios.post(`${URL}/applicant/addApplication`, {...myNewApp,email: props.user,});
      let doMatch = await axios.post(`${URL}/applicant/addMatchWith`, {id,offerId})
      console.log('doMatch',doMatch)
      setAlert('Its a match!')
    } catch (error) {
    }
  }

  //Obtenir l'email d'une offre
  const getEmail = async(props)=>{
    let offerIdEmail = props
    console.log('offerID', offerIdEmail)
    try {
      // recoit l'email
      let getEmail = await axios.post(`${URL}/applicant/getEmail`, {offerIdEmail})
      console.log('email to email',getEmail.data.data)
      emailtoemail= getEmail.data.data
      // une fois reçu lance mail:to
      {window.open(`mailto:${emailtoemail}?subject=We%20just%20matched%20&body=Type%20in%20..`) }
      // {<Mailto label={"Write me an E-Mail"} mailto={`mailto:${emailtoemail}`} />}
    } catch (error) {
    }
  }

  //Fonction pour supprimer un like (enlever mon id de likedBy) /deleteLikedBy',controller.deleteLikedBy)
  const deleteLikes = async (offerID)=>{
    let userId = applicantsId;
    let offerDeleteId = offerID;
    console.log('userId',userId)
    console.log('offerDeleteId',offerDeleteId)
    // applicationId
  try {
    let unlikeOffer = await axios.post(`${URL}/applicant/deleteLikedBy`,{userId, offerDeleteId} )
    console.log('unlikeOffer',unlikeOffer)    
  } catch (error) { }
  }

  // Fonction pour supprimer un match (enlever mon id de matchWith)
  const deleteMatches = async (props)=>{
    let userId = id; // id user connecté
    let offerDeleteId = props; // id de l'offre
    try {
      let unMatchOffer = await axios.post(`${URL}/applicant/deleteMatchWith`,{userId, offerDeleteId} ) 
      console.log('unMatchOffer',unMatchOffer)
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
  // the whole return
  <>
  {/* // the return of likes */}
  <div>
    {!likeOffer
    // the if condition
      ? (
        <>
          <h1>You don't have any likes, yet.</h1>
          <h4>Keep chasing !</h4>
        </>
        ):(
        <>
        <div>
          <h2>Here are the recruiters that liked you so far !</h2>   
        </div>
        <div className="classicPage">
        <div className="topTitle">
{/*{console.log('offerID', offersId)} {console.log('myOffer', myOffer)} */}
      {/* //the offer displayed */}
      {likeOffer.map((c, index)=>( //matchOffer
        <div  key={index} className='jobApplication'>
        <h3 key={index}>{c.companyName}</h3>
         <h4 key={index}>{c.jobTitle}</h4>
         <p key={index}>{c.jobFields}</p>
         {c.remote ? <div className="chip">remote</div> : <div></div>}
         {c.onSite ? <p>onSite</p> : <p></p>}
         {c.flexible ? <p>Flexible</p> : <p></p>}
         <p key={index} className="location"> <FaLocationArrow style={{marginRight:'.5em'}}/>{c.location}</p>
         <h4 key={index} className="jobDescription">Job Description</h4>
         <p key={index}>{c.jobDescription}</p>
         <h4 key={index}>Skills</h4>
         <h4 key={index}>Soft</h4>
         <div key={index} className='transparent'>{c._id}</div>
         <div key={index} className="flex">
         {Object.keys(c.softSkills).map((key) => ( <p className="inputArray">{c.softSkills[key]}</p> ))}
         </div>
         <h4 key={index}>Hard</h4>
         <div key={index} className="flex">
         {Object.keys(c.hardSkills).map((key) => (<p className="inputArray">{c.hardSkills[key]}</p> ))}
         </div>
         <h4 key={index}>Languages</h4>
         {Object.keys(c.languagesSpoken).map((key) => (<p className="inputArray">{c.languagesSpoken[key]}</p>))}
         <button key={index} className='btn' onClick={() => deleteLikes(c._id)}> delete like </button>
         <button key={index} className='btn' onClick={() => doMatch(c._id)}> Match with recruiter </button> 
         <div><p>{alert}</p></div>
         </div>
      ))}
      {/* // end of div jobApplication */}
      {/* // end of div topTitle */}
      </div>
      {/* // end of div classicPage */}
      </div>
      {/* // end of div - likeOffer */}
         </>
  // end of like - ending div
  )}
  </div>
      {/* <div> // starting div of matches */}
           <>
        {!matchOffer
         // if condition
        ? (
        <>
        <h2>You don't have any matches, yet.</h2>
        <h4>Keep chasing !</h4>
        </>
        )
        // else condition
        :
        (
        <>
        <h2>Here are your matches</h2>
          <div className='matchOffer'>
          <div className="classicPage">
          <div className="topTitle">
            {/* {console.log(matchOffer)} */}
            {matchOffer.map((d, index)=>(
              <div className="jobApplication">
              <div key={index}>
                <h3 key={index}>{d.companyName}</h3>
                <h4 key={index}>{d.jobTitle}</h4>
                <p key={index}>{d.jobFields}</p>
                {d.remote ? <div className="chip">remote</div> : <div></div>}
                {d.onSite ? <p>onSite</p> : <p></p>}
                {d.flexible ? <p>Flexible</p> : <p></p>}
                <p key={index} className="location"><FaLocationArrow style={{marginRight:'.5em'}}/>{d.location}</p>
                <h4 key={index} className="jobDescription">Job Description</h4>
                <p key={index}>{d.jobDescription}</p>
                <h4 key={index}>Skills</h4>
                <h4 key={index}>Soft</h4>
                <div key={index} className="flex">{Object.keys(d.softSkills).map((key) => (<p className="inputArray">{d.softSkills[key]}</p>))} </div>
                <h4 key={index}>Hard</h4>
                <div key={index} className="flex">{Object.keys(d.hardSkills).map((key) => (<p className="inputArray">{d.hardSkills[key]}</p>))}</div>
                <h4 key={index}>Languages</h4>
                <div key={index} className="flex">{Object.keys(d.languagesSpoken).map((key) => (<p className="inputArray">{d.languagesSpoken[key]}</p>))}</div> 
                <div key={index} className='transparent'>{offerIdEmail = d._id}</div>
                <button key={index} className='btn' onClick={() => deleteMatches(d._id)}> Delete Match </button>
                <div className='btn' key={index}><FaEnvelope style={{marginRight:'.5em'}} onClick={() => getEmail(d._id)}/>Get in touch</div>
                </div>
                </div>
                ))}
              <div><p>{alert}</p></div>
              </div>
              </div>
        </div>
        
        </>
  
      )}
    
        {/* // the end of the whole return */}
  </> 
  </>
  )
  }
  export default MatchesApplicant

