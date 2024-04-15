const express = require('express')
const router = express.Router()
const authController = require('../../../controllers/auth.controller')
const {registerValidation} = require('../../../middlewares/validation.middleware')


router.post('/login',(req,res)=>res.send("Hello"))
router.post('/register',registerValidation,authController.registerUser)

module.exports=router