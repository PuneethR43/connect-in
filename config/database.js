const mongoose = require('mongoose')
const config = require('config')
const mongoUri = config.get('mongoURI')

const configureDB = async () => {
    try{
        await mongoose.connect(mongoUri, { 
            useUnifiedTopology: true, 
            useNewUrlParser: true, 
            useCreateIndex: true,
            useFindAndModify: false
        })
        console.log('connected to DB')
    } catch(err) {
        console.log('DB connection failed',err.message)
    }
}

module.exports = configureDB