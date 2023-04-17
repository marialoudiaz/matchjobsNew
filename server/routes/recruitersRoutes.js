const express = require('express');
const router = express.Router();
const controller = require('../controllers/recruitersControllers')
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
// //updateJobOffer
// router.post('updateJobOffer',controller.updateJobOffer)
// //getAllMyJobOffer
// router.get('/getAllMyJobOffers',controller.getAllMyJobOffers)
// //likeApplicant
// router.post('/likeApplicant',controller.LikeApplicant)
// //unlikeApplicant
// router.post('/unlikeApplicant',controller.unlikeApplicant)



module.exports = router;