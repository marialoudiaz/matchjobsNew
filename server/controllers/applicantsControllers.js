// const  Admins = require('../models/admins')
const  Applicant = require('../models/applicants')
const  JobApplication = require('../models/jobapplication')
const JobOffer = require('../models/joboffer')
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
  console.log(email)
  try {
    const user = await Applicant.findOne({email});
    if (user) return res.json({ ok: false, message: "User exists!" });
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
    await Applicant.create(newUser);
    // res.json({ ok: true, message: "Successfully registered" });
    next()
  } catch (error) {
    console.log(error)
    res.json({ ok: false, error });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password){
    return res.json({ ok: false, message: "All fields are required" });
  }
  // if (!validator.isEmail(email)){
  //   return res.json({ ok: false, message: "Invalid email provided" });
  // }
  try {
    const user = await Applicant.findOne({ email });
    if (!user) return res.json({ ok: false, message: "Invalid user provided" });
    const match = await argon2.verify(user.password, password);
    if (match) {
      // once user is verified and confirmed we send back the token to keep in localStorage in the client and in this token we can add some data -- payload -- to retrieve from the token in the client and see, for example, which user is logged in exactly. The payload would be the first argument in .sign() method. In the following example we are sending an object with key userEmail and the value of email coming from the "user" found in line 47
      const token = jwt.sign({email:user.email, userType:"applicant",_id:user._id}, jwt_secret, { expiresIn: "1h" }); //{expiresIn:'365d'}
      // after we send the payload to the client you can see how to get it in the client's Login component inside handleSubmit function
      res.json({ ok: true, message: "welcome back", token, email });
    } else return res.json({ ok: false, message: "Invalid data provided" });
  } catch (error) {
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

// //findApplicants
const findApplicants = async (req,res) =>{
  const {email, password} = req.body;
  try {
      // true if find email
      const findAppName = await Applicant.findOne({email}) // findOne returns the whole object (can use findAppName.password to access key password)
      if (findAppName){
      // CHECK IF PASSWORD MATCHES
     const findPassword = await findAppName.password     //Applicant.findOne({password})
        if (findAppName._id.toString()=== findPassword._id.toString()){
          res.send({ok:true, data:`Applicant ${email} found successfully`})
        } else{
          res.send({ok:false,data:'email and password do not match'})
        }
      }else{
      res.send({ok:false, data:"user does not exist"})
      }
    } catch (error) {
      res.send(error)
    }
}
// //addApplicants
const addApplicants = async (req,res) =>{
  const {email, password} = req.body; 
  try {
    const findRec = await Applicant.findOne({email, password})
    if (!findRec){

      const createNew = await Applicant.create({email, password})
      if(createNew){
        res.send({ok:true,data:'User added successfully'})
      }
      else{
        res.send({ok:false,data:'failed to add a new user'})
      }
    } else {
      res.send({ok:false,data:'user already exists'})
    }
  } catch (error) {
    res.send(error)
  }
}

// //deleteApplicants
const deleteApplicant = async (req,res)=>{
  const {email} = req.body;
  try {
    // find the email
    const findemail = await Applicant.findOneAndDelete({email})
      if (findemail){
        // await Recruiter.deleteOne({email})
        res.send ({ok:true,data:'your profile has been deleted successfully'})
      }else{
        res.send({ok:false,data:'failed to find you'})
      }
  } catch (error) {
    res.send(error)
  }
}

// //updateApplicants
const updateApplicant = async (req,res)=>{
  const {oldemail,oldPassword,email, password} = req.body
 
  try{
      const findRec = await Applicant.findOne({email:oldemail,password:oldPassword})
      const findNewRec = await Applicant.findOne({email})

      

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
const addApplication = async (req,res) =>{
  const {jobTitle, remote,onSite, flexible,minPrice,maxPrice,location,bio,softSkills,hardSkills, jobFields,languagesSpoken, uploadedFiles, email } = req.body; 
  try {
   const applicant = await Applicant.findOne({email})
   if(applicant){
      const newApplication = await JobApplication.create({jobTitle, remote,onSite, flexible,minPrice,maxPrice,location,bio,softSkills,hardSkills, jobFields,languagesSpoken, uploadedFiles,likedBy :[], applicantsId: applicant._id, matchWith :[] })
      console.log(newApplication)
      res.send({ok:true,data:'new job application created successfully'})
   }else{
      res.send({ok:false,data:'could not find the current user'})
   } 
  } catch (error) {
    res.send(error)
  }

}

// //deleteApplication
const deleteApplication = async (req,res)=>{
  const {applicationId} = req.body;
  try {
      const findApp = await JobApplication.findOneAndDelete({_id:applicationId})
      if (findApp){
      res.send ({ok:true,data:`${findApp.jobTitle} deleted successfully`})
      } else {
      res.send ({ok:false,data:`failed to find ${findApp.jobTitle}`})
      }
  } catch (error) {
    res.send(error) 
}
}

// //updateJobApplication
const updateJobApplication = async (req,res)=>{
  const {offerID, myEdit} = req.body; 
  debugger
  try{
      const updated = await JobApplication.findOneAndUpdate({_id: offerID},myEdit)
      if (updated){
      console.log(updated)
      res.send({ok:true, data:`Job application updated successfully`})
     } else{
      res.send({ok:false, data:`Job application not found`})
    }
     }catch(error){
    res.send(error)
     }
  }


const getJobApplication = async(req,res)=>{
  // this id = id of one job application
  debugger
  let {id} = req.params;
  console.log(id)
    try {
      const jobApp = await JobOffer.findOne({_id: id}) // search something in DB by the name of '_id'
      console.log("jobApp",jobApp)
      // if (jobApp){
        res.send({ok: true, data: jobApp})
      // }else{
      //   res.send ({ok: false, data: "Job application doesn't exist"})
      // }
     
    } catch (error) {
      res.send(error)
    }
}




// // getAllMyJobApplications
const getAllMyJobApplications = async(req,res)=>{
console.log("test")
debugger
// look for records in JobApplications collection with specific applicantsId reference
// pass to the controller a current applicant_id
let {id} = req.params; // const {applicantId}= req.body
  try {
    // empty array with objects of all the job offers that belongs to this recruiter
    // var arrJobApplications =[]
    const allJobApplications = await JobApplication.findOne({applicantsId: id}) // FIND ALL
    console.log("getalljobs",allJobApplications)
    res.send({ok:true, data: allJobApplications})
  } catch (error) {
    res.send(error)
  }
}

// // //likeApplicant
// const likeApplicant = async(req,res)=>{
//   debugger
//   const {applicationId, recruiterId}= req.body
//   try {
//     await JobApplication.findOneAndUpdate({_id: applicationId}, {$push: {likedBy: {recruiter_id : recruiterId}}}) // à partir de field permet de ne push que la clef 'recruiter_id'
//     res.send({ok:true, data:' Applicant liked successfully'})    
//       // if(application){application.likedBy.push({recruiterId})}else{res.send({ok:true, data:"Applicant id could'nt be found"})}
//    } catch (error) {
//     res.send(error)
//   }
// }

const getEmail = async(req,res)=>{
  // take offerId (of the offer)
  debugger
  const {offerIdEmail}= req.body // offerId
  // let {id} = req.params; //offerId
  // let offerId = {id: id}
  try {
    // Find the specific offer
    const findOffer = await JobOffer.findOne({_id: offerIdEmail})
    console.log(findOffer)
    // find recruitersId inside this offer
    let recruitersId = findOffer.recruitersId
    console.log(recruitersId)
    // Find user based on recruitersId
    let getRecruiter = await Recruiter.findOne({_id: recruitersId})
    console.log(getRecruiter)
    // Return email of user
    let email = getRecruiter.email
    console.log('finalemail', email)
    res.send({ok:true, data: email})
  } catch (error) {
    res.send(error)
  }
}



// // //likeJobOffer
const likeOffer = async(req,res)=>{
  const {offerId, applicantId}= req.body
  try {
    const offer = await JobOffer.findOneAndUpdate({_id: offerId}, {$push: {likedBy: {applicant_id : applicantId}}}) // FIND ALL
   } catch (error) {
    res.send(error)
  }
}

// // //unlikeJobOffer
const unlikeOffer = async(req,res)=>{
  const {offerId, applicantId}= req.body
  try {
    const offer = await JobOffer.findOneandUpdate({_id: offerId}, {$pull: {likedBy: {applicant_id : applicantId}}}) // FIND ALL 
  } catch (error) {
    res.send(error)
  }
}

  // getAllJobApplications in the main
  const getAllOffers = async (req,res)=>{
    try {
      const allJobOffers = await JobOffer.find({})
      res.send({ok:true, data: allJobOffers})
    } catch (error) {
      res.send(error)
    }}
  
// getAllMatches
const getAllMatch = async (req,res)=>{
  let {id} = req.params;
  try {
    // find the likers id and display its profile
    const likers = await JobApplication.findOne({_id: id})
    console.log(likers)
    res.send({ok:true, data: likers})
  } catch (error) {
    res.send(error)
  }}

  
// getLikedby
const getLikedby = async(req,res)=>{
  // prend user.id pass
  let {id} = req.params;
  try {
    // L'APPLICATION
    // find the offer of the user based on the id of the user(v)
    const myJobApp = await JobApplication.findOne({applicantsId: id}) // à partir de l'id (params) de l'user trouver une application (jobApplication) contenant la clef 'applicantsid' dont la valeur est id(params)
    console.log('myJobApp-likedBy', myJobApp.likedBy)
    // map function that returns an array with every recruiter_id
    let recIDs = myJobApp.likedBy.map(rec=>rec.recruiter_id) 
    const recruiters = await JobOffer.find({recruitersId:{$in : recIDs}}) // {recruitersId: myJobApp.likedBy[0].recruiter_id}
    console.log('recruiters ', recruiters)
    res.send({ ok: true, data: recruiters });
} catch (error) {
  console.error(error);
}
};

// deleteLikedBy (delete the person who liked you from your model)
// pull out id of the recruiter from you likedby.recruiters-id db
const deleteLikedBy = async(req,res)=>{ 
  // take id of the user + id of the offer
  const {userId, offerDeleteId} = req.body;
  try {
    // trouver l'offre sur laquelle je clicke
  const findOffer = await JobOffer.findOne({_id: offerDeleteId})
  console.log('recruitersId', findOffer.recruitersId)

  // Extraire recruitersId de l'offre
  let recruitersId = findOffer.recruitersId

  // find the profile of user based on its id
  // pull recruitersId from object.likedBy
  const pullId = await JobApplication.findOneAndUpdate({applicantsId: userId}, {$pull: {likedBy: {recruiter_id : recruitersId}}})
  console.log('pullId', pullId)
  res.send({ok:true, data: 'This user is no longer in your likes' })
  } catch (error) {
    res.send(error) 
  }
}


// addMatchWith
const addMatchWith = async (req,res)=>{
// ADD id of my application to matchWith of the offer (applicants-id > application => matchWith (of offerID))
// ADD offerID to my MatchWith
debugger
  try {
    // Récupérer mon profil pour l'envoyer au recruiter
const {id,offerId} = req.body;  // je prends mon userid et offerId(recruiter)
console.log('id', id, 'offerId', offerId)
const allJobApplications = await JobApplication.findOne({applicantsId: id}) // je cherche mon profil avec mon userid
console.log(allJobApplications._id)
let myProfile = allJobApplications._id // j'assigne l'id de l'offre (on ne stocke pas lobjet entier mais son id)
console.log(myProfile)

// Envoyer Mon profil au recruiter (trouver le bon recruiter et push mon profil)
const sendProfile2Rec = await JobOffer.findOneAndUpdate({_id: offerId}, {$push: {matchWith: {applicant_id : myProfile}}})
console.log(sendProfile2Rec)

//Envoyer le profil du recruiter dans matchWith de mon application (profil)
const sendRec2Profile = await JobApplication.findOneAndUpdate({applicantsId: id}, {$push: {matchWith: {recruiter_id : offerId}}})
console.log(sendRec2Profile)
res.send({ok: true, data: 'Applications and Offers successfully added to both matchWith arrays'})
  } catch (error) {
    res.send(error)
  }
}

// getMatchWith (do the same in recruiter)
/// get array of all offerIDin match With
const getMatchWith = async(req,res)=>{
  // prend user.id pass
  debugger
  let {id} = req.params;
  try {
    // find the offer of the user based on the id of the user(v)
    const myJobApp = await JobApplication.findOne({applicantsId: id}) // à partir de l'id (params) de l'user trouver une application (jobApplication) contenant la clef 'applicantsid' dont la valeur est id(params)
    console.log('myJobApp-matchWith', myJobApp.matchWith)
    // map function that returns an array with every recruiter_id
    let recIDs = myJobApp.matchWith.map(rec=>rec.recruiter_id) 
    console.log('recIDs ', recIDs)
    const recruiters = await JobOffer.find({_id:{$in : recIDs}}) // {recruitersId: myJobApp.likedBy[0].recruiter_id}
    console.log('recruiters ', recruiters)
    res.send({ ok: true, data: recruiters });
} catch (error) {
  console.error(error);
}
};

// deleteMatchWith
const deleteMatchWith = async(req,res)=>{
  // take id of the user + id of the offer
  const {userId, offerDeleteId} = req.body;
  try {
    // take id of the offer and return object
  const findOffer = await JobOffer.findOne({_id: offerDeleteId})
  console.log('recruitersId', findOffer.recruitersId)
  let recruitersId = findOffer.recruitersId
  // pull userId from object.likedBy
  const pullId = await JobApplication.findOneAndUpdate({applicantsId: userId}, {$pull: {matchWith: {recruitersId : recruitersId}}})
  // await JobOffer.findOneandUpdate({_id: offerId}, {$pull: {likedBy: {applicant_id : applicantId}}}) 
  console.log('pullId', pullId)
  res.send({ok:true, data: 'This user is no longer in your matches' })
  } catch (error) {
    res.send(error) 
  }
}




module.exports = {
  findApplicants,
  addApplicants,
  deleteApplicant,
  updateApplicant,
  addApplication,
  deleteApplication,
  updateJobApplication,
  getAllMyJobApplications,
  likeOffer,
  unlikeOffer,
  login,
  register,
  verify_token,
  getJobApplication,
  getEmail,
  getAllOffers,
  getAllMatch,
  getLikedby,
  deleteLikedBy,
  addMatchWith,
  getMatchWith,
  deleteMatchWith,
}
