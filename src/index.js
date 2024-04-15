const envVariables = require('./configurations/validate.env')
const connectDB = require('./configurations/mongoose')
const server = require('./app')
const logger = require('pino')()
connectDB().then(()=>{
    server.listen(envVariables.port,()=>console.log(`Server running on port ${envVariables.port}`))
}).catch(err=>{console.log("MongoDB DB connection failed", err)
process.exit(1)
})