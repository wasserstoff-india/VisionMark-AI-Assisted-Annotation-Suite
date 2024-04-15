const mongoose = require('mongoose')
const envVariables = require('./validate.env')
const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${envVariables.mongodbUrl}`,{  useNewUrlParser: true,
        useUnifiedTopology: true })
        console.log(`\nMongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("MONGODB connection FAILED ", error);
        process.exit(1)
    }
}

module.exports = connectDB