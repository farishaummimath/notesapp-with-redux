const mongoose = require('mongoose')
const Schema = mongoose.Schema

const noteSchema = new Schema({
    title : {
        type : String,
        required : true

    },
    description :{
        type : String,
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
    // img: {
    //     type:Object,
    //     required:true
    // }
    img: { data: Buffer, contentType: String}

    
})
// Creating a Model

const Note = mongoose.model('Note', noteSchema) // instantiating
module.exports = Note