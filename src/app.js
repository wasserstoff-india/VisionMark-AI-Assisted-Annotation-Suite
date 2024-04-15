const express = require('express')
const cors = require('cors')
const compression = require('compression')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const {errorHandler} =require('./middlewares/error.middleware')
const server = express()


server.use(cors())
server.use(compression())
server.use(cookieParser())
server.use(bodyParser.urlencoded({extended:true}))
server.use(bodyParser.json())

server.use("/",require('./routes/index'))
server.use(errorHandler)
module.exports = server