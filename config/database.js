const mongoose = require('mongoose')

// mongoose connection configuration
// mongodb+srv://myMongoUser:<password>@cluster0-pqhed.mongodb.net/test?retryWrites=true&w=majority
mongoose.Promise = global.Promise
const CONNECTION_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/oct-notes-app'
const setupDB = ()=>{
    mongoose.connect(CONNECTION_URI,{ useNewUrlParser: true ,useUnifiedTopology: true })
    .then(()=>{
        console.log('connected to db')
    })
    .catch((err)=>{
        console.log('errrrrrr',err)
    })
}

module.exports = setupDB
