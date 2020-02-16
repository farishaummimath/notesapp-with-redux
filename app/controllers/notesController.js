const Note = require('../models/note')
const Category = require('../models/category')

module.exports.list = (req,res) => {
        Note.find({user : req.user._id}).populate('category',['_id','name'],Category).sort({'createdAt': -1})
        .then((notes)=>{
            res.json(notes)
        })
        .catch((err) => {
            res.json(err)
        })
     
}

module.exports.create = (req,res) => {

        const body  = req.body
        if(req.file) {
            body.photo = req.file.filename
        }
        console.log("inside contr body",body)

        const note = new Note(body)
        note.user = req.user._id 
        console.log("inside contr Note",note)

        note.save()
        .then((note)=>{
            console.log(note)
            res.json(note)
        })
        .catch((err)=>{
            res.json(err)
        })
    
}

module.exports.show = (req,res) => {
    const id = req.params.id
    Note.findOne({_id:id,user:req.user._id}).populate('category',["_id","name"])
        .then((note)=>{
            if(note) {
                res.json(note)

            } else {// promise resolved, in case of that note is null
                res.json({})
            }
        })
        .catch((err)=>{
            res.json(err)
        })
}

module.exports.update = (req,res)=>{
    const id = req.params.id
    const body = req.body
    if(req.file) {
        body.photo = req.file.filename
    }
    console.log("Edited",body)

    Note.findOneAndUpdate({_id:id,user:req.user._id}, body,{new : true, runValidators: true})
     .then((note)=>{
         console.log(note)
         if(note) {
             res.json(note)
         } else {
             res.json({})
         }

     })
     .catch((err)=>{
         res.json(err)

     })

}
module.exports.destroy = (req,res)=>{
    const id = req.params.id
    Note.findOneAndDelete({_id:id,user:req.user._id})
    .then((note)=>{
        if(note){
            res.json(note)
        } else {
            res.json({})
        }

    })
    .catch((err)=>{
        res.json(err)
    })
}