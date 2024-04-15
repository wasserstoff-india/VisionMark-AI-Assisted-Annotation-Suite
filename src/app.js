const express = require('express')
const cors = require('cors')
const compression = require('compression')
const server = express()

server.use(cors())
server.use(compression())

server.get("/",(req,res)=>{
    res.send("AVS")
})
module.exports = server