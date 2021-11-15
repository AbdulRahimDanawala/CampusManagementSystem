const express = require('express');
const router = express.Router();


const companyController = require('./company-controller');


router.post('/job', companyController.saveNewJob)
router.get('/jobs', companyController.getAllJobs)
router.post('/find/job', companyController.findJob)
router.post('/find/jobs', companyController.findJobsByEmail)
router.post('/apply/job', companyController.applyJob)
router.post('/find/appliedJobs', companyController.appliedJobs)
router.post('/undo', companyController.undoThisJob)
router.post('/delete', companyController.deleteThisJob)
router.post('/delete/job', companyController.deleteThisJobById)
router.post ('/delete/candidate', companyController.deleteCandidate)
router.post('/find/candidate', companyController.findCandidate)
router.post('/candidate-delete', companyController.candidatDelete)
router.post('/delete-all-job', companyController.deleteAllJobByEmail)
router.post('/approve', companyController.approvePost)
module.exports = router; 