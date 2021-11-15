const express = require('express');
const router = express.Router();

const usersController = require('./user-controller')


router.post('/signin', usersController.signinWithEmailAndPassword)
router.post('/signup', usersController.signUpWithDetails)
router.post('/update', usersController.updateUser)
router.post('/find', usersController.findMathingUser )
router.get('/all', usersController.getAllUsers)
router.post('/delete', usersController.deleteThisUser)
router.get('/find/admin', usersController.adminFind)
router.get('/find/students', usersController.findStudents)
router.get('/find/companies', usersController.findCompanies )
module.exports = router;