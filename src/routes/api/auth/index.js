const express = require('express')
const router = express.Router()
const authController = require('../../../controllers/auth.controller')
const {registerValidation,loginEmailValidation} = require('../../../middlewares/validation.middleware')
router.post('/login',loginEmailValidation,authController.loginUser)
router.post('/register',registerValidation,authController.registerUser)
router.post('/logout',authController.logout)
router.post('/refreshtoken',authController.refresh)


module.exports=router