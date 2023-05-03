import React, { useState, useEffect} from 'react';
import { useNavigate, useParams, Link, Navigate } from "react-router-dom";
import axios from 'axios';
import {URL} from "../config"

function MatchesApplicant(props) {


  // Prendre id de ceux qui likent
  const params = useParams()
  console.log("id from params",params.id)  // recruiterId
  let id = params.id
  let applicantsId = id // celui qui like 

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
    console.log(allMyLikes); // retourne an array with all objects (offers) inside
    setLikeOffer(allMyLikes.data.data)
  } catch (error) {
    console.log(error);
  }}


  ///// Render ce que j'ai liké en retour - Mes matchs
  // const handleMatch = async ()=>{
  //   try {
  //   } catch (error) {
  //   }
  // }
   

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
    // handleMatch();
  },[]) 


  ////////// ROUTES FOR CONTROLLERS

// getLikedby
// /getLikedby/:id',controller.getLikedby)

// deleteLikedBy
// /deleteLikedBy',controller.deleteLikedBy)



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
          <><p>hihi</p></>
      //   <>
      //   <div className='likeOffer'>
      //   <div className="classicPage">
      //   <div className="topTitle">
      //   <div className="jobApplication">
        
      //   {console.log('offerID', offersId)}
      //   {console.log('myOffer', myOffer)}
  
      // // the offer displayed
      //   <h3>{c.companyName}</h3>
      //   <h4>{c.jobTitle}</h4>
      //   <p>{c.jobFields}</p>
      //   {c.remote ? <div className="chip">remote</div> : <div></div>}
      //   {c.onSite ? <p>onSite</p> : <p></p>}
      //   {c.flexible ? <p>Flexible</p> : <p></p>}
      //   <p className="location">{c.location}</p>
      //   <h4 className="jobDescription">Job Description</h4>
      //   <p>{c.jobDescription}</p>
      //   <h4>Skills</h4>
      //   <h4>Soft</h4>
         
      //   <div className="flex">
      //   {Object.keys(c.softSkills).map((key) => ( <p className="inputArray">{c.softSkills[key]}</p> ))}
      //   </div>
         
      //   <h4>Hard</h4>
      //   <div className="flex">
      //   {Object.keys(matchOffer.hardSkills).map((key) => (<p className="inputArray">{matchOffer.hardSkills[key]}</p> ))}
      //   </div>
         
      //   <h4>Languages</h4>
      //   <div className="flex">
      //   {Object.keys(matchOffer.languagesSpoken).map((key) => (<p className="inputArray">{matchOffer.languagesSpoken[key]}</p>))}
      //   </div>
      //   {/* <button className='btn' onClick={deleteMatch}>delete</button> */}
  
  
      //   {/* // end of div jobApplication */}
      //   </div>
      //   {/* // end of div topTitle */}
      //   </div>
      //   {/* // end of div classicPage */}
      //   </div>
      //   {/* // end of div - likeOffer */}
      //   </div>
        
      //   </>
  
  // end of like - ending div
  )}
  </div>

  
  
  
  
      {/* <div> // starting div of matches */}
           <>
        {!matchOffer
         // if condition
        ? (
        <>
        <h1>You don't have any matches, yet.</h1>
        <h4>Keep chasing !</h4>
        </>
        )
        // else condition
        :
        (
        <>
        <p>hihi</p>
        {/* <div className='matchOffer'>
        <div className="classicPage">
        <div className="topTitle">
        <div className="jobApplication">
  
          {console.log('offerID', offersId)}
          {console.log('myOffer', myOffer)}
          <h3>{matchOffer.companyName}</h3>
          <h4>{matchOffer.jobTitle}</h4>
          <p>{matchOffer.jobFields}</p>
          {matchOffer.remote ? <div className="chip">remote</div> : <div></div>}
          {matchOffer.onSite ? <p>onSite</p> : <p></p>}
          {matchOffer.flexible ? <p>Flexible</p> : <p></p>}
          <p className="location">{matchOffer.location}</p>
          <h4 className="jobDescription">Job Description</h4>
          <p>{matchOffer.jobDescription}</p>
          <h4>Skills</h4>
          <h4>Soft</h4>
           
          <div className="flex">
          {Object.keys(matchOffer.softSkills).map((key) => (<p className="inputArray">{matchOffer.softSkills[key]} {console.log(`/recruiter/${offersId}/edit`)}</p>))}
          </div>
           
          <h4>Hard</h4>
          <div className="flex">
          {Object.keys(matchOffer.hardSkills).map((key) => (<p className="inputArray">{matchOffer.hardSkills[key]}</p>))}
          </div>
           
          <h4>Languages</h4>
          <div className="flex">
          {Object.keys(matchOffer.languagesSpoken).map((key) => (<p className="inputArray">{matchOffer.languagesSpoken[key]}</p>))}
          </div> */}
  
       
        {/* </div>
       
        </div>
      
        </div>
      
        </div> */}
        
        </>
  
  
  
      
      )}
   
{/* // the end of the whole return */}
  </> </>
  )
  }
  export default MatchesApplicant

