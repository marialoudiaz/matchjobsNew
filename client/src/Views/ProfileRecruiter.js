import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link, Navigate } from "react-router-dom";
import axios from "axios";
import { URL } from "../config";
import '../App.css';

function ProfileRecruiter(props) {
  let navigate = useNavigate();
  // 1 - passer l'id de l'user
  const params = useParams();
  console.log("id user", params.id); //object id de l'user ( et non l'offre)
  let userId = params.id;

  // console.log("props", props)

  // 2 - the props I pass - Email of user
  console.log("user Email", props.user);

  // 3 - L'id de l'offre
  const [offersId, setoffersId] = useState("");

  // l'ID a l'id de l'user
  const [msg, setMsg] = useState("");

  // the application to be displayed
  const [myOffer, setmyOffer] = useState(null);

  // la nouvelle offre créée
  const [myNewOffer, setmyNewOffer] = useState({
    companyName: "",
    jobTitle: "",
    jobFields: "",
    remote: false,
    onSite: false,
    flexible: false,
    minPrice: "",
    maxPrice: "",
    location: "",
    jobDescription: "",
    softSkills: [],
    hardSkills: [],
    jobFields: "",
    languagesSpoken: [],
  });

  // State component - collecter les inputs a stocker dans l'array
  const [skill, setSkill] = useState("");

  //handleChange du form- pour les inputs
  const handleChange = async (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setmyNewOffer({ ...myNewOffer, [name]: value });
  };

  //handleSubmit - creer loffre
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const create = await axios.post(`${URL}/recruiter/addJobOffer`, {
        ...myNewOffer,
        email: props.user,
      });
      console.log(create);
      if (create.data.ok) {
        console.log(create.data.message);
        setMsg(create.data.message);
      } else {
        console.log(create.data.message);
        setMsg(create.data.message);
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
    setmyNewOffer({
      ...myNewOffer,
      [changed]: [...myNewOffer[changed], skill],
    });
    setSkill("");
  };



  // useEffect(() => {
  //   console.log(myNewOffer);
  // }, [myNewOffer]);

  useEffect(() =>{
    handleOffer()
  }, []);


  // handleApp
  // const id = user._id;
  const handleOffer = async () => {
    console.log(userId);
    try {
      let allMyOffer = await axios.get(
        `${URL}/recruiter/getAllMyJobOffers/${userId}`
      );
      console.log(allMyOffer);
      if (allMyOffer.data.ok) {
        setmyOffer([allMyOffer.data.data]);
        console.log('setmyOffer',[allMyOffer.data.data]) // l'offre à display
        console.log("setmyOffer", myOffer);
        console.log("setoffersId", myOffer[0]._id);
        setoffersId(myOffer[0]._id); // id de l'offre
      } else {
        console.log("hihi");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // fonction pour supprimer
  const deleteOffer = async () => {
    console.log("id for the controller", offersId);
    try {
      await axios.post(`${URL}/recruiter/deleteJobOffer`, { offersId });
      // setmyOffer([deleteOffer.data.data])
    } catch (error) {
      console.log(error);
    }
  };

  // render the applications every render
  useEffect(() => {
    handleOffer();
  }, []);




  return (
    <div className="page-wrapper">
      <div className="InitalPage">
        {/* <h1>Hello {email}</h1> */}

        {!myOffer ? (
          ////////////////// IF CONDITION

          <>
            <div className="card">
              <div className="top-card">
                {/* <div className='inside-card'><p onClick= {<Navigate to={'/recruiter/${user._id}/view'}/>}>Create a new offer</p></div> */}

                {/* // le formulaire avec toutes les inputs a envoyer dans DB */}

                <form onSubmit={handleSubmit}>
                  <label>Company Name</label>
                  <input
                    name="companyName"
                    value={myNewOffer.companyName}
                    onChange={handleChange}
                  />
                  <label>Job Title</label>
                  <input
                    name="jobTitle"
                    value={myNewOffer.jobTitle}
                    onChange={handleChange}
                  />
                  <label>Job Field</label>
                  <input
                    name="jobFields"
                    value={myNewOffer.jobFields}
                    onChange={handleChange}
                  />
                  <label>Remote</label>
                  <input
                    type="radio"
                    name="mobility"
                    value={myNewOffer.remote}
                    onChange={handleChange}
                  />
                  <label>On Site</label>
                  <input
                    type="radio"
                    name="mobility"
                    value={myNewOffer.onSite}
                    onChange={handleChange}
                  />
                  <label>Flexible</label>
                  <input
                    type="radio"
                    name="mobility"
                    value={myNewOffer.flexible}
                    onChange={handleChange}
                  />

                  <label>Min Price</label>
                  <input
                    name="minPrice"
                    value={myNewOffer.minPrice}
                    onChange={handleChange}
                  />
                  <label>Max Price</label>
                  <input
                    name="maxPrice"
                    value={myNewOffer.maxPrice}
                    onChange={handleChange}
                  />
                  <label>Location</label>
                  <input
                    name="location"
                    value={myNewOffer.location}
                    onChange={handleChange}
                  />
                  <label>Job Description</label>
                  <input
                    name="jobDescription"
                    value={myNewOffer.jobDescription}
                    onChange={handleChange}
                  />

                  <label>Soft Skills</label>
                  <input onChange={handleChangeSkills} name="temporarySoft" />
                  <button
                    type="button"
                    onClick={() => handleSkills("softSkills")}
                    className="btn"
                  >
                    Add Skill
                  </button>

                  <label>Hard Skills</label>
                  <input onChange={handleChangeSkills} name="temporaryHard" />
                  <button
                    type="button"
                    onClick={() => handleSkills("hardSkills")}
                    className="btn"
                  >
                    Add Skill
                  </button>

                  <label>Languages</label>
                  <input
                    onChange={handleChangeSkills}
                    name="temporaryLanguage"
                  />
                  <button
                    type="button"
                    onClick={() => handleSkills("languagesSpoken")}
                    className="btn"
                  >
                    Add Languages
                  </button>

                  <button type="submit" className="btn">
                    Create offer
                  </button>
                  <p>{msg}</p>
                </form>
              </div>
            </div>
            <h3>you don't have any application created yet</h3>
            <p>all your app will be displayed here</p>
          </>
        ) : (
          ////////////////// ELSE CONDITION

          // Version avec les offres affichées

          <div className="classicPage">
            {/* // applications created */}
            <div className="topTitle">
              {myOffer.map((c) => (
                <h2>Hello {c.companyName},</h2>
              ))}
              <h2>Welcome back</h2>
            </div>

            <div className="jobApplication">
              {myOffer.map((c) => (
                <>
                  {/* <Link to = {`/${type}/view/${c._id}`}> */}
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
                  {Object.keys(c.softSkills).map((key) => (
                  <p className="inputArray">{c.softSkills[key]} {console.log(`/recruiter/${offersId}/edit`)}</p>
                
                  ))}
                  </div>
                  <h4>Hard</h4>
                  <div className="flex">
                  {Object.keys(c.hardSkills).map((key) => (
                  <p className="inputArray">{c.hardSkills[key]}</p>
                  ))}
                  </div>
                  <h4>Languages</h4>
                  <div className="flex">
                  {Object.keys(c.languagesSpoken).map((key) => (
                  <p className="inputArray">{c.languagesSpoken[key]}</p>
                  ))}
                  </div>
                  <Link to={`/recruiter/${userId}/edit`}><button className='btn'>Edit</button></Link>
                  {/* <button  onClick= {() => navigate(`/recruiter/${offersId}/edit`)}>edit</button> */}
                  <button className='btn' onClick={() => navigate(`/recruiter/${userId}/view`)}>view</button>
                  <button className='btn' onClick={deleteOffer}>delete</button>
                </>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfileRecruiter;