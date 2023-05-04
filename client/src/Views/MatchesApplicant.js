import React, { useState, useEffect} from 'react';
import { useNavigate, useParams, Link, Navigate } from "react-router-dom";
import axios from 'axios';
import {URL} from "../config"

function MatchesApplicant(props) {


  // Prendre id de ceux qui likent
  const params = useParams()
  console.log("id from params",params.id)  // recruiterId
  let id = params.id
  let applicantsId = id // User connecté (son id)

    // 2 - the props I pass - Email of user
  console.log("user Email", props.user);

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
    setLikeOffer(allMyLikes.data.data)
  } catch (error) {
    console.log(error);
  }}


  ///// Render ce que j'ai liké en retour - Mes matchs
  //'/getMatchWith/:id',
  // add to my matchWith the offers_id when i click on match button
  const handleMatch = async ()=>{
    try {
      let allMyMatches = await axios.get(`${URL}/applicant/getMatchWith/${applicantsId}`)
      console.log('allMyMatches',allMyMatches); // retourne an array with all objects (offers) inside
      setMatchOffer(allMyMatches.data.data)
    } catch (error) {
      console.log(error);
    }}
   

  // // Fonction pour matcher (envoyer mon id dans matchWith)
  // const doMatch = async (applicationId)=>{
  //   // j'appuye sur bouton avec fonction (doMatch)

  //   // Alert - "it's a match"
  //   // Affiche la div cachée avec le mail (icon clicable)
  //   // Requête post - (addMatchWith)
  //   console.log(recruiterId)
  //   console.log(applicationId)
  //   try {
  //     let likeApp = await axios.post(`${URL}/recruiter/likeApplicant`, {applicationId, recruiterId})
  //     console.log('likeApp',likeApp)
  //   } catch (error) {
  //   }
  // }

  // // Fonction pour supprimer un like (enlever mon id de likedBy)
  // const deleteLikes = async (applicationId)=>{
  //   //j'appuye dessus
  //   // pull (enleve) recruiters._id de mes likedBy 
  //   ///appeler fonction async
  //   console.log(recruiterId)
  //   console.log(applicationId)
  //   try {
  //     let unlikeApp = await axios.post(`${URL}/recruiter/unlikeApplicant`,{applicationId, recruiterId} )
  //     console.log('unlikeApp',unlikeApp)
  //   } catch (error) {
  //   }
  // }  
// /deleteLikedBy',controller.deleteLikedBy)


  // Fonction pour supprimer un match (enlever mon id de matchWith)
  // const deleteMatches = async ()=>{
  //   try {
  //   } catch (error) {
  //   }
  // }

  // // Obtenir l'email d'une offre
  // const getEmail = async ()=>{
  //   try {
      
  //   } catch (error) {
      
  //   }
  // }


  //A Chaque Render
  useEffect(()=>{
    handleLikes();
    handleMatch();
  },[]) 


  ////////// ROUTES FOR CONTROLLERS

// getLikedby
// /getLikedby/:id',controller.getLikedby)



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
        )
        :
        (
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
         <button className='btn'> delete like </button>
         <button className='btn'> Match with recruiter </button> 
         {/* onClick={deleteLikes} */}
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

