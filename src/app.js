const express = require('express')
const cors = require('cors')
const compression = require('compression')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const swagger = require('swagger-ui-express')
const apiDocs = require('./swagger.json')
const {errorHandler} =require('./middlewares/error.middleware')
const server = express()

/**
 * CORS to handle request comming from different ports and URL's
 */
server.use(cors())
/**
 * Middleware to compress incoming request and outgoing response
 */
server.use(compression())
/**
 * Middleware to parse and set request cookie
 */
server.use(cookieParser())
server.use(express.static('public'))
/**
 * Middleware to parse incoming request body as well as multipart
 */
server.use(bodyParser.urlencoded({extended:true}))
server.use(bodyParser.json())
/**
 * Hosting swagger doc for API documents
 */
server.use('/api-docs',swagger.serve,swagger.setup(apiDocs))
server.use("/",require('./routes/index'))
/**
 * Error handling middleware for non ApiError
 */
server.use(errorHandler)
module.exports = server