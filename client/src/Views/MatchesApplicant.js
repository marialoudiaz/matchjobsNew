import React, { useState, useEffect} from 'react';
import { useNavigate, useParams, Link, Navigate } from "react-router-dom";
import axios from 'axios';
import {URL} from "../config"
import { FaMailBulk } from 'react-icons/fa';

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


// Render les likes que j'ai recu
  // Render les likes que j'ai recu
const handleLikes = async ()=>{
  try {
    let allMyLikes = await axios.get(`${URL}/applicant/getLikedBy/${applicantsId}`)
    console.log('allMyLikes',allMyLikes); // retourne an array with all objects (offers) inside
    if (allMyLikes.data.data!=[]){
      setLikeOffer(allMyLikes.data.data)
    }else{
      setLikeOffer(null)
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
    }}


  // // Fonction pour matcher (envoyer mon id dans matchWith)
    const doMatch = async()=>{
  // console.log('id', id)
  // console.log('offerId',offerId)
  //Requête post - (addMatchWith)
    try {
      // const create = await axios.post(`${URL}/applicant/addApplication`, {...myNewApp,email: props.user,});
      // let doMatch = await axios.post(`${URL}/applicant/addMatchWith`, {id,offerId})
      console.log('doMatch',doMatch)
        //Alert - "it's a match" (in the response)
    } catch (error) {
    }
  }

  //Obtenir l'email d'une offre
  const getEmail = async()=>{
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
  } catch (error) { 
  }
}

  // Fonction pour supprimer un match (enlever mon id de matchWith)
  const deleteMatches = async ()=>{
    let userId = applicantsId;
    let offerDeleteId= offerIdEmail;
    try {
      let unMatchOffer = await axios.post(`${URL}/applicant/deleteLikedBy`,{userId, offerDeleteId} ) 
      console.log('unMatchOffer',unMatchOffer)    
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
        <div className='likeOffer'>
        <h2>Here are the recruiters who liked you so far !</h2>
        <div className="classicPage">
        <div className="topTitle">
        <div className="jobApplication">
{/*{console.log('offerID', offersId)} {console.log('myOffer', myOffer)} */}
      {/* //the offer displayed */}
      {likeOffer.map((c)=>( //matchOffer
        <>
        <h3>{c.companyName}</h3>
         <h4>{c.jobTitle}</h4>
         <p>{c.jobFields}</p>
         {c.remote ? <div className="chip">remote</div> : <div></div>}
         {c.onSite ? <p>onSite</p> : <p></p>}
         {c.flexible ? <p>Flexible</p> : <p></p>}
         <p className="location">{c.location}</p>
         <h4 className="jobDescription">Job Description</h4>
         <p>{c.jobDescription}</p>
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
         <button className='btn' onClick={() => deleteLikes(c._id)}> delete like </button>
         <button className='btn' onClick={() => doMatch()}> Match with recruiter </button> 
         </div>
         </>
      ))}
      {/* // end of div jobApplication */}
      </div>
      {/* // end of div topTitle */}
      </div>
      {/* // end of div classicPage */}
      </div>
      {/* // end of div - likeOffer */}
      </div>
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
          <div className="jobApplication">
            {console.log(matchOffer)}
            {matchOffer.map((d)=>(
        <>
          {/* // {console.log('offerID', offersId)}
          // {console.log('myOffer', myOffer)} */}
          <h3>{d.companyName}</h3>
          <h4>{d.jobTitle}</h4>
          <p>{d.jobFields}</p>
          {d.remote ? <div className="chip">remote</div> : <div></div>}
          {d.onSite ? <p>onSite</p> : <p></p>}
          {d.flexible ? <p>Flexible</p> : <p></p>}
          <p className="location">{d.location}</p>
          <h4 className="jobDescription">Job Description</h4>
          
          <p>{d.jobDescription}</p>
          <h4>Skills</h4>
          <h4>Soft</h4>
          <div className="flex">{Object.keys(d.softSkills).map((key) => (<p className="inputArray">{d.softSkills[key]}</p>))} </div>
          <h4>Hard</h4>
          <div className="flex">{Object.keys(d.hardSkills).map((key) => (<p className="inputArray">{d.hardSkills[key]}</p>))}</div>
          <h4>Languages</h4>
          <div className="flex">{Object.keys(d.languagesSpoken).map((key) => (<p className="inputArray">{d.languagesSpoken[key]}</p>))}</div> 
          <div className='transparent'>{offerIdEmail = d._id}</div>
          <button className='btn' onClick={() => deleteMatches()}> Delete Match </button>
          <div><FaMailBulk onClick={() => getEmail()}/>Get in touch</div>
          </>
          ))}
        </div>
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

