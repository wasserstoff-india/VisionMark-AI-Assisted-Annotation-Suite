const express = require('express')
const router = express.Router()

router.get('/',(req,res)=>res.send("Hello"))
router.use('/auth',require('./auth/index'))
router.use('/user',require('./user/index'))


module.exports=router