const express = require('express');
const router = express.Router();
const controller = require('../controllers/applicantsControllers')

router.post('/register', controller.register, controller.login);
router.post('/login', controller.login);
router.post('/verify_token', controller.verify_token);
//findApplicants
router.post('/findApplicants',controller.findApplicants)
//addApplicants
router.post('/addApplicants',controller.addApplicants)
//deleteApplicants
router.post('/deleteApplicant',controller.deleteApplicant)
//updateApplicants
router.post('/updateApplicant',controller.updateApplicant)
//addApplication,
router.post('/addApplication',controller.addApplication)
//deleteApplication
router.post('/deleteApplications',controller.deleteApplication)
//updateJobApplication
router.post('/updateJobApplication',controller.updateJobApplication)
// get one job application
router.get('/getJobApplication/:id', controller.getJobApplication)
// getAllMyJobApplications/?id=''
router.get('/getAllMyJobApplications/:id',controller.getAllMyJobApplications) 
// getEmail
router.post('/getEmail',controller.getEmail)
// //likeJobOffer
router.post('/likeOffer',controller.likeOffer)
// //unlikeJobOffer
router.post('/unlikeOffer',controller.unlikeOffer)
// getAllOffers
router.get('/getAllOffers',controller.getAllOffers)

// getLikedby
router.get('/getLikedby/:id',controller.getLikedby)

// // deleteLikedBy (delete the person who liked you from your model)
router.post('/deleteLikedBy',controller.deleteLikedBy)

// addMatchWith
router.post('/addMatchWith',controller.addMatchWith)

// // getMatchWith
router.get('/getMatchWith/:id',controller.getMatchWith)

// // deleteMatchWith
// router.post('/deleteMatchWith',controller.deleteMatchWith)

module.exports = router;