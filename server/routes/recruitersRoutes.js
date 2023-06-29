const express = require('express');
const router = express.Router();
const controller = require('../controllers/recruitersControllers')
router.post('/register', controller.register, controller.login);
router.post('/login', controller.login);
router.post('/verify_token', controller.verify_token);
//findRecruiter
router.post('/findRecruiter',controller.findRecruiter)
//addRecruiter
router.post('/addRecruiter',controller.addRecruiter)
//deleteRecruiter
router.post('/deleteRecruiter',controller.deleteRecruiter)
//updateRecruiter
router.post('/updateRecruiter',controller.updateRecruiter)
//addJobOffer,
router.post('/addJobOffer',controller.addJobOffer)
//deleteJobOffer
router.post('/deleteJobOffer',controller.deleteJobOffer)
//updateJobOffer
router.post('/updateJobOffer',controller.updateJobOffer)
// getJobOffer
router.get('/getJobOffer/:id', controller.getJobOffer)
// getAllMyJobOffer/?id=''
router.get('/getAllMyJobOffers/:id',controller.getAllMyJobOffer)
// //likeApplicant
router.post('/likeApplicant',controller.likeApplicant)
// //unlikeApplicant
router.post('/unlikeApplicant',controller.unlikeApplicant)

// getAllApplications
router.get('/getAllApplications',controller.getAllApplications)

// getJobApplication
router.get('/getJobApplication/:id',controller.getJobApplication)

router.get('/getAllMatch/:id', controller.getAllMatch)

router.get('/getEmail/:id', controller.getEmail)

router.get('/getLikedBy/:id', controller.getLikedBy)
router.get('/getMatchWith/:id', controller.getMatchWith)

router.post('/deleteLikedBy',controller.deleteLikedBy)
router.post('/addMatchWith',controller.addMatchWith)
router.post('/deleteMatchWith',controller.deleteMatchWith)



module.exports = router;