const  JobApplication = require('../models/jobapplication')
const JobOffer = require('../models/joboffer')

const  Applicant = require('../models/applicants')
const  Recruiter = require('../models/recruiter')
const argon2 = require("argon2"); //https://github.com/ranisalt/node-argon2/wiki/Options
const jwt = require("jsonwebtoken");
const jwt_secret = process.env.JWT_SECRET;

const register = async (req, res, next) => {
  // this salt can be truly random with one of available npm packages
  const salt = '321dsa'
  const { email, password, password2 } = req.body;
  if (!email || !password || !password2){
    return res.json({ ok: false, message: "All fields required" });
  }
  if (password !== password2){
    return res.json({ ok: false, message: "Passwords must match" });
  }
  // if (!validator.isEmail(email)){
  //   return res.json({ ok: false, message: "Invalid email" });
  // }
  try {
    const user = await Recruiter.findOne({ email });
    if (user) return res.json({ ok: false, message: "User already exists!" });
    const hash = await argon2.hash(password,salt);
    // not salted, salt is appending a random string to a password to strengthen the hash 
    const hash2 = await argon2.hash(password); 
    // we cna see that hashes for salted and unsalted are different 
    console.log("hash ==>", hash);
    console.log("hash2 ==>", hash2);
    const newUser = {
      email,
      password: hash,
    };
    await Recruiter.create(newUser);
    next()
    // res.json({ ok: true, message: "Successfully registered" });
  } catch (error) {
    console.log(error)
    res.json({ ok: false, error });
  }
};



const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password){
    return res.json({ ok: false, message: "all input fields are required"});
  }
  // if (!validator.isEmail(email)){
  //   return res.json({ ok: false, message: "Invalid email provided" });
  // }
  try {
    const user = await Recruiter.findOne({ email });
    if (!user) return res.json({ ok: false, message: "Invalid user provided" });
    const match = await argon2.verify(user.password, password);
    if (match) {
      // once user is verified and confirmed we send back the token to keep in localStorage in the client and in this token we can add some data -- payload -- to retrieve from the token in the client and see, for example, which user is logged in exactly. The payload would be the first argument in .sign() method. In the following example we are sending an object with key userEmail and the value of email coming from the "user" found in line 47
      const token = jwt.sign({email:user.email, userType:'recruiter',_id:user._id}, jwt_secret, { expiresIn: "1h" }); //{expiresIn:'365d'}
      console.log(token)
      // after we send the payload to the client you can see how to get it in the client's Login component inside handleSubmit function
      res.json({ ok: true, message: "welcome back", token, email });
    }else return res.json({ ok: false, message: "Invalid data provided" });
  } catch (error) {
    console.log("login controller ", error)
    res.json({ ok: false, error });
  }
};

const verify_token = (req, res) => {
  console.log(req.headers.authorization);
  const token = req.headers.authorization;
  jwt.verify(token, jwt_secret, (err, succ) => {
    err
      ? res.json({ ok: false, message: "Token is corrupted" })
      : res.json({ ok: true, succ });
  });
};




const findRecruiter = async (req,res) =>{
    const {email, password} = req.body;
    try {
        // true if find email
        const findRecName = await Recruiter.findOne({email})
        console.log(findRecName._id)
        if (findRecName){
        // CHECK IF PASSWORD MATCHES
        const findPassword = await findRecName.password
          if (findRecName._id.toString()=== findPassword._id.toString()){
            res.send({ok:true, data:`recruiter ${email} found successfully`})
          } else{
            res.send({ok:false,data: 'email and password do not match'})
          }
        }else{
        res.send({ok:false, data:"user does not exist"})
        }
      } catch (error) {
        res.send(error)
      }

}

const addRecruiter = async (req,res) =>{
    const {email, password} = req.body; 
    try {
      const findRec = await Recruiter.findOne({email, password})
      if (!findRec){
        const createNew = await Recruiter.create({email, password})
        if(createNew){
          res.send({ok:true,data:'recruiter added successfully'})
        }else{
          res.send({ok:false,data:'failed to add a new recruiter'})
        }} else {
        res.send({ok:false,data:'recruiter already exists'})
      }} catch (error) {
      res.send(error)
    }
}
const deleteRecruiter = async (req,res)=>{
    const {email} = req.body;
    try {
      // find the email
      const findEmail = await Recruiter.findOneAndDelete({email})
        if (findEmail){
          // await Recruiter.deleteOne({email})
          res.send ({ok:true,data:'your profile has been deleted successfully'})
        }else{
          res.send({ok:false,data:'failed to find you'})
        }
    } catch (error) {
      res.send(error)
    }
}
const updateRecruiter = async (req,res)=>{
    const {oldemail,oldPassword,email, password} = req.body
    try{
        const findRec = await Recruiter.findOne({email:oldemail,password:oldPassword})
        const findNewRec = await Recruiter.findOne({email})

        if(findRec){
            if(findNewRec){
                res.send({ok:false,data:`email ${email} already exists`})
            }
            else{
                await Recruiter.updateOne(findRec,{email,password})
                res.send({ok:true,data:`Your email ${oldemail} has been updated to ${email? email:oldemail}. Your password ${oldPassword} has been updated to ${password? password:oldPassword}.`})
            }
        }
        else{
            res.send({ok:false,data:'could not find the user'})
        }
    }catch(error){
        res.send(error)
    }
}


// //addApplication,
const addJobOffer = async (req,res) =>{
  const {companyName,  jobTitle, remote, onSite, flexible, minPrice, maxPrice,location, jobDescription, softSkills, hardSkills,jobFields,languagesSpoken, email } = req.body; 
  try {
   const recruiter = await Recruiter.findOne({email})
   if(recruiter){
      const newOffer = await JobOffer.create({companyName,jobTitle,remote,onSite,flexible,minPrice,maxPrice,location,jobDescription,softSkills,hardSkills,jobFields, languagesSpoken,likedBy :[], recruitersId: recruiter._id, matchWith :[]})
      console.log(newOffer)
      res.send({ok:true,data:'new job offer created successfully'})
   }else{
      res.send({ok:false,data:'could not find the current user'})
   } 
  } catch (error) {
    res.send(error)
  }

}


const deleteJobOffer = async (req,res)=>{
    const {offersId} = req.body;
    debugger
    try {
        const findOffer = await JobOffer.findOneAndDelete({_id:offersId})
        if (findOffer){
        // await JobOffer.deleteOne({companyName, jobDescription})
        res.send ({ok:true,data:`${findOffer.jobTitle} deleted successfully`})
        } else {
        res.send ({ok:false,data:`failed to find ${findOffer.jobTitle}`})
        }
    } catch (error) {
        res.send(error)   
  }
}


const updateJobOffer = async (req,res)=>{
debugger
  const {offerID, myEdit} = req.body;
  console.log('the offer passed', myEdit)
  try{
  const updated = await JobOffer.findOneAndUpdate({_id: offerID},myEdit)
  // const findjobOffer = await JobOffer.findOne({_id: offerID})
    if (updated){
    // const updated = await JobOffer.updateOne({findjobOffer},{myNewOffer})
    console.log(updated)
    res.send({ok:true, data:`Job offer updated successfully`})
   } else{
    res.send({ok:false, data:`Job offer not found`})
  }
   }catch(error){
  res.send(error)
   }
}


const getJobOffer = async(req,res)=>{
  // this id = id of one job offer
  let {id} = req.params;
    try {
      const jobOffer = await JobOffer.findOne({recruitersId: id})
      if (jobOffer){
        res.send({ok: true, data: jobOffer})
      }else{
        res.send ({ok: false, data: "Job offer doesn't exist"})
      }
     
    } catch (error) {
      res.send(error)
    }
}


const getJobApplication = async(req,res)=>{
  debugger
  // this id = id of one job application
  let {id} = req.params;
  console.log(id)
    try {
      const jobApp = await JobApplication.findOne({_id: id}) // search something in DB by the name of '_id'
      // console.log("jobApp",jobApp)
      // if (jobApp){
        res.send({ok: true, data: jobApp})
      // }else{
      //   res.send ({ok: false, data: "Job application doesn't exist"})
      // }
     
    } catch (error) {
      res.send(error)
    }
}





// //getAllMyJobOffer
const getAllMyJobOffer = async(req,res)=>{
  // id = recruiters' id
  debugger
  let {id} = req.params;
  console.log(id)
  debugger
  
  try {
    // empty array with objects of all the job offers that belongs to this recruiter
    // var arrJobOffer =[]
    const allJobOffers = await JobOffer.findOne({recruitersId: id}) // FIND ALL
    console.log("allJobOffers",allJobOffers)
    res.send({ok:true, data: allJobOffers})
  //     for (var ele of allJobOffers){
  //     if (ele._id.toString() == recruiterId.toString()){ // take the job offers of a specific id(user)
  //       arrJobOffer.push(ele)
  //     }else {
  //     }} res.send({ok:true, data: arrJobOffer})    
  } catch (error) {
    res.send(error)
  }
}

const getEmail = async(req,res)=>{
  const {offerIdEmail}= req.body
  try {
    const findApp = await JobApplication.findOne({_id: offerIdEmail})
    console.log(findApp, 'FindApp')
    let applicantsId = findApp.applicantsId
    console.log(applicantsId, 'applicantsId')
    let getApplicant = await Applicant.findOne({_id: applicantsId})
    console.log(getApplicant,'getApplicant')
    let email = getApplicant.email
    console.log('finalemail', email)
    res.send({ok:true, data: email})
  } catch (error) {
    res.send(error)
  }
}




// //likeApplicant
const likeApplicant = async(req,res)=>{
  debugger
  const {applicationId, recruiterId}= req.body
  try {
    await JobApplication.findOneAndUpdate({_id: applicationId}, {$push: {likedBy: {recruiter_id : recruiterId}}}) // à partir de field permet de ne push que la clef 'recruiter_id'
    res.send({ok:true, data:' Applicant liked successfully'})    
      // if(application){application.likedBy.push({recruiterId})}else{res.send({ok:true, data:"Applicant id could'nt be found"})}
   } catch (error) {
    res.send(error)
  }
}
// unlikeApplicant
const unlikeApplicant = async(req,res)=>{
  debugger
  const {applicationId, recruiterId}= req.body
  try {
    await JobApplication.findOneAndUpdate({_id: applicationId}, {$pull: {likedBy: {recruiter_id : recruiterId}}}) // FIND ALL
    res.send({ok:true, data:' Applicant unliked successfully'})
} catch (error) {
    res.send(error)
  }}


  // getAllJobApplications in the main
  const getAllApplications = async (req,res)=>{
  try {
    const allJobApplications = await JobApplication.find({})
    res.send({ok:true, data: allJobApplications})
  } catch (error) {
    res.send(error)
  }}

  // getAllMatches
  const getAllMatch = async (req,res)=>{
    let {id} = req.params;
    try {
      // find the likers id and display its profile
      const likers = await JobOffer.findOne({_id: id})
      console.log(likers)
      res.send({ok:true, data: likers})
    } catch (error) {
      res.send(error)
    }}


const getLikedBy = async(req,res)=>{
  // prend user.id pass
  let {id} = req.params;
  try {
    // L'APPLICATION
    // find the offer of the user based on the id of the user(v)
    const myJobOffer = await JobOffer.findOne({recruitersId: id}) // à partir de l'id (params) de l'user trouver une application (jobApplication) contenant la clef 'applicantsid' dont la valeur est id(params)
    console.log('myJobOffer-likedBy', myJobOffer.likedBy)
    // map function that returns an array with every recruiter_id
    let appIDs = myJobApp.likedBy.map(app=>app.applicant_id) 
    const applicants = await JobApplication.find({applicantsId:{$in : appIDs}}) // {recruitersId: myJobApp.likedBy[0].recruiter_id}
    console.log('applicants', applicants)
    res.send({ ok: true, data: applicants });
} catch (error) {
  console.error(error);
}
};

const deleteLikedBy = async(req,res)=>{ 
  // take id of the user + id of the offer
  const {userId, appDeleteId} = req.body;
  try {
    // trouver l'offre sur laquelle je clicke
  const findApp = await JobApplication.findOne({_id: appDeleteId})
  console.log('applicantsId', findApp.applicantsId)
  let applicantsId = findApp.applicantsId
  const pullId = await JobOffer.findOneAndUpdate({recruitersId: userId}, {$pull: {likedBy: {applicantsId : applicantsId}}})
  console.log('pullId', pullId)
  res.send({ok:true, data: 'This user is no longer in your likes' })
  } catch (error) {
    res.send(error) 
  }
}


// addMatchWith
const addMatchWith = async (req,res)=>{
  try {
const {id,offerId} = req.body;  // je prends mon userid et offerId(recruiter)
console.log('id', id, 'offerId', offerId)
const allJobOffer = await JobOffer.findOne({recruitersId: id}) // je cherche mon profil avec mon userid
console.log(allJobOffer._id)
let myProfile = allJobOffer._id // j'assigne l'id de l'offre (on ne stocke pas lobjet entier mais son id)
console.log(myProfile)
// Envoyer Mon profil au recruiter (trouver le bon recruiter et push mon profil)
const sendProfile2App = await JobApplication.findOneAndUpdate({_id: offerId}, {$push: {matchWith: {recruiter_id : myProfile}}})
console.log(sendProfile2App)
//Envoyer le profil de l'applicant dans matchWith de mon offre (profil)
const sendApp2Profile = await JobOffer.findOneAndUpdate({recruitersId: id}, {$push: {matchWith: {applicant_id : offerId}}})
console.log(sendApp2Profile)
res.send({ok: true, data: 'Applications and Offers successfully added to both matchWith arrays'})
  } catch (error) {
    res.send(error)
  }
}

// getMatchWith (do the same in recruiter)
/// get array of all offerIDin match With
const getMatchWith = async(req,res)=>{
  // prend user.id pass
  let {id} = req.params;
  try {
    // find the offer of the user based on the id of the user(v)
    const myJobOffer = await JobOffer.findOne({recruitersId: id}) // à partir de l'id (params) de l'user trouver une application (jobApplication) contenant la clef 'applicantsid' dont la valeur est id(params)
    console.log('myJobOffer-matchWith', myJobOffer.matchWith)
    // map function that returns an array with every recruiter_id
    let appIDs = myJobOffer.matchWith.map(app=>app.applicant_id) 
    console.log('appIDs ', appIDs)
    const applicants = await JobApplication.find({_id:{$in : appIDs}}) // {recruitersId: myJobApp.likedBy[0].recruiter_id}
    console.log('applicants', applicants)
    res.send({ ok: true, data: applicants });
} catch (error) {
  console.error(error);
}
};

// deleteMatchWith
const deleteMatchWith = async(req,res)=>{
  // take id of the user + id of the offer
  const {userId, appDeleteId} = req.body;
  console.log('userconnecté', userId)
  console.log('application a delete', appDeleteId)
  try {
    // Trouver l'offre que je veux retirer de mes matchs
  const findApp = await JobApplication.findOne({_id: appDeleteId})
  console.log('applicantsId', findApp.applicantsId)
  let applicantsId = findApp.applicantsId
  //Je trouve mon profil
  // J'enleve de matchWith le recruiter
  const removeMyMatch = await JobOffer.findOneAndUpdate({recruitersId: userId}, {$pull: {matchWith: {applicant_id : applicantsId}}})
  console.log('removeMyMatch', removeMyMatch)
  //Enleve mon id des matchs de l'user
  const removeHisMatch = await JobApplication.findOneAndUpdate({applicantsId: applicantsId}, {$pull: {matchWith: {recruiter_id: userId}}})
  console.log('removeHisMatch', removeHisMatch)
  res.send({ok:true, data: 'This user is no longer in your matches' })
  } catch (error) {
    res.send(error) 
  }
}



module.exports = {
    findRecruiter,
    addRecruiter,
    deleteRecruiter,
    updateRecruiter,
    addJobOffer,
    deleteJobOffer,
    updateJobOffer,
    getAllMyJobOffer,
    likeApplicant,
    unlikeApplicant,
    login,
    register,
    verify_token,
    getJobOffer,
    getAllApplications,
    getJobApplication,
    getAllMatch,
    getEmail,
    getLikedBy,
    deleteLikedBy,
    addMatchWith,
    getMatchWith,
    deleteMatchWith,

  }
