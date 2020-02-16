const mongoose = require('mongoose')
const Schema = mongoose.Schema

const noteSchema = new Schema({
    title : {
        type : String,
        required : true

    },
    description :{
        type : String,
        required : true
    },
    createdAt : {
        type : Date,
        default: new Date()
    },
    category : {
        type : Schema.Types.ObjectId,
        ref : 'Category',
        required : true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref : 'User'
    },
    pinned : {
        type : Boolean,
        default : false
    },
    photo : {
        type : String
    },
    color : {
        type: String
    },
    archived : {
        type : Boolean
    },
    bin : {
        type : Boolean
    }
    

    
})
// Creating a Model

const Note = mongoose.model('Note', noteSchema) // instantiating
module.exports = Note