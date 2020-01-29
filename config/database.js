const mongoose = require('mongoose')

// mongoose connection configuration
const setupDB = ()=>{
    mongoose.connect('mongodb://localhost:27017/oct-notes-app',{ useNewUrlParser: true ,useUnifiedTopology: true })
    .then(()=>{
        console.log('connected to db')
    })
    .catch((err)=>{
        console.log('errrrrrr',err)
    })
}

module.exports = setupDB
