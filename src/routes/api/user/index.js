const express = require('express')
const router = express.Router()
const authMiddleware = require("../../../middlewares/authentication.middleware")
const userController = require('../../../controllers/user.controller')

router.get('/',authMiddleware.authenticate,userController.getAllUsers)
router.get('/:id',authMiddleware.authenticate,userController.getUserById)

module.exports=router