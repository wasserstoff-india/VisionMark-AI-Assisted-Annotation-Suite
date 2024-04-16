const express = require('express')
const router = express.Router()
const authMiddleware = require("../../../middlewares/authentication.middleware")
const userController = require('../../../controllers/user.controller')

router.get('/',authMiddleware.authenticateAdmin,userController.getAllUsers)
router.get('/:id',authMiddleware.authenticateAdmin,userController.getUserById)

module.exports=router