import React, { useState, useEffect} from 'react';
import { useNavigate, useParams, Link, Navigate } from "react-router-dom";
import axios from 'axios';
import {URL} from "../config"

function MatchesApplicant() {


  // Prendre id de ceux qui likent
  const params = useParams()
  console.log("id from params,params.id) // recruiterId")
  let id = params.id
  let likeurs = id // celui qui like 

// créer un state component (likeOffer) pour stocker les likes que j'ai recu
  const [likeOffer, setLikeOffer]=useState('')
// créer un state component (matchOffer) pour stocker les matchs (ceux qui m'ont liké et que j'ai liké en retour)
  const [matchOffer, setMatchOffer]=useState('')



  // Render les likes que j'ai recu
  const handleLikes = async ()=>{
    try {
        let allMyMatch = await axios.get(`${URL}/applicant/getLikedBy/${likeurs}`)
        console.log(allMyMatch);
        setLikeOffer(allMyMatch.data.data) // [{},{}.....]
    } catch (error) {
        console.log(error);
    }}

  // Render ce que j'ai liké en retour - Mes matchs
  const handleMatch = async ()=>{
    try {
    } catch (error) {
    }
  }
   

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
  const deleteMatches = async ()=>{
    try {
    } catch (error) {
    }
  }

  // Obtenir l'email d'une offre
  const getEmail = async ()=>{
    try {
      
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
    {/* // BEGINNING OF LIKES */}
  {/* <>
  {!likeOffer
    ? ( 
    <> */}
    <h1>You don't have any likes, yet.</h1>
    <h4>Keep chasing !</h4>
    {/* </>
    ) 
    : 
    ( */}
      {/* <>
      <div className='likeOffer'>
    <div className="classicPage"> */}
      {/* // applications created */}
      {/* <div className="topTitle">
       <div className="jobApplication"> */}
          <>
            {/* <Link to = {`/${type}/view/${c._id}`}> */}
            {/* {console.log('offerID', offersId)}
            {console.log('myOffer', myOffer)}
            <h3>{matchOffer.companyName}</h3> */}
            {/* <h4>{matchOffer.jobTitle}</h4>
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
            {Object.keys(matchOffer.softSkills).map((key) => (
            <p className="inputArray">{matchOffer.softSkills[key]} {console.log(`/recruiter/${offersId}/edit`)}</p>
          
            ))}
            </div>
            <h4>Hard</h4>
            <div className="flex">
            {Object.keys(matchOffer.hardSkills).map((key) => (
            <p className="inputArray">{matchOffer.hardSkills[key]}</p>
            ))} */}
            {/* </div>
            <h4>Languages</h4>
            <div className="flex">
            {Object.keys(matchOffer.languagesSpoken).map((key) => (
            <p className="inputArray">{matchOffer.languagesSpoken[key]}</p>
            ))}
            </div>
            <Link to={`/recruiter/${userId}/edit`}><button className='btn'>Edit</button></Link>
            <Link to={`/recruiter/${userId}/view`}><button className='btn'>View</button></Link> */}
            {/* <button  onClick= {() => navigate(`/recruiter/${offersId}/edit`)}>edit</button> */}
            {/* <button className='btn' onClick={() => navigate(`/recruiter/${userId}/view`)}>view</button> */}
            {/* <button className='btn' onClick={deleteMatch}>delete</button> */}
            </>
        {/* </div>
       </div>
       </div>
       </div> */}
      </>
)}
// </>
{/* // END OF LIKES */}




     {/* // BEGINNING OF MATCH */}
    // <>
        {/* {!matchOffer
          ? (  */}
        {/* ////////////////// IF CONDITION */}
          <>
          <h1>You don't have any matches, yet.</h1>
          <h4>Keep chasing !</h4>
          </>
          {/* ) 
          : 
          ( */}
            <>
          
          {/* ////////////////// ELSE CONDITION
          // Version avec les offres affichées */}
        {/* <div className='matchOffer'>
          <div className="classicPage"> */}
            {/* // applications created */}
            {/* <div className="topTitle">
             <div className="jobApplication"> */}
                <>
                  {/* <Link to = {`/${type}/view/${c._id}`}> */}
                  {/* {console.log('offerID', offersId)}
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
                  {Object.keys(matchOffer.softSkills).map((key) => (
                  <p className="inputArray">{matchOffer.softSkills[key]} {console.log(`/recruiter/${offersId}/edit`)}</p>
                 */}
                  {/* ))} */}
                  {/* </div>
                  <h4>Hard</h4>
                  <div className="flex">
                  {Object.keys(matchOffer.hardSkills).map((key) => (
                  <p className="inputArray">{matchOffer.hardSkills[key]}</p>
                  ))} */}
                  {/* </div>
                  <h4>Languages</h4>
                  <div className="flex">
                  {Object.keys(matchOffer.languagesSpoken).map((key) => (
                  <p className="inputArray">{matchOffer.languagesSpoken[key]}</p>
                  ))}
                  </div>
                  <Link to={`/recruiter/${userId}/edit`}><button className='btn'>Edit</button></Link>
                  <Link to={`/recruiter/${userId}/view`}><button className='btn'>View</button></Link> */}
                  {/* <button  onClick= {() => navigate(`/recruiter/${offersId}/edit`)}>edit</button> */}
                  {/* <button className='btn' onClick={() => navigate(`/recruiter/${userId}/view`)}>view</button> */}
                  {/* <button className='btn' onClick={deleteMatch}>delete</button> */}
                  </>
              {/* </div>
             </div>
             </div>
             </div> */}
            </>
     {/* )} */}
     {/* </>
     </> */}
   {/* // END OF MATCH */}
//   );
// }
 export default MatchesApplicant

