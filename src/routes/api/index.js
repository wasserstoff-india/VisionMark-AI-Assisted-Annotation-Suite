const express = require('express')
const router = express.Router()

router.use('/anotate',require('./anotate/index'))
router.use('/auth',require('./auth/index'))
router.use('/user',require('./user/index'))


module.exports=router