const express = require('express');
const router = express.Router();
const controller = require('../controllers/applicantsControllers')

router.post('/register', controller.register);
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
router.post('updateJobApplication',controller.updateJobApplication)
// get one job application
router.get('/getJobApplication/:id', controller.getJobApplication)
// getAllMyJobApplications/?id=''
router.get('/getAllMyJobApplications/:id',controller.getAllMyJobApplications)
// getUserName
router.get('/getUserName/:id',controller.getUserName)
// //likeJobOffer
router.post('/likeOffer',controller.likeOffer)
// //unlikeJobOffer
router.post('/unlikeOffer',controller.unlikeOffer)

module.exports = router;