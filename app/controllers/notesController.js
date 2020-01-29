const Note = require('../models/note')
const fs = require('fs')


const Category = require('../models/category')

module.exports.list = (req,res) => {
        Note.find().populate('category',['_id','name'],Category)
        .then((notes)=>{
            res.json(notes)
        })
        .catch((err) => {
            res.json(err)
        })
    
}

module.exports.create = (req,res) => {
        const body  = req.body
        const note = new Note(body)
        console.log(req.body)
        console.log(req.file)
        if(req.file){
            note.img.data = fs.readFileSync(req.file.path)
            note.img.contentType = 'image/jpeg'  
        }
              
        note.save()
        .then((note)=>{
            res.json(note)
        })
        .catch((err)=>{
            res.json(err)
        })
    
}

module.exports.show = (req,res) => {
    const id = req.params.id
    Note.findById(id).populate('category',["_id","name"])
        .then((note)=>{
            console.log(note,"NOTE")
            if(note) {
                res.json(note)

            } else {// promise resolved, in case of that note is null
                res.json({})
            }
        })
        .catch((err)=>{
            console.log("------",err)
            res.json(err)
        })
}

module.exports.destroy = (req,res)=>{
    console.log("DELETE OPS")
    const id = req.params.id
    Note.findByIdAndDelete(id)
    .then((note)=>{
        if(note){
            res.json(note)
        } else {
            res.json({})
        }

    })
    .catch((err)=>{
        console.log("------",err)
        res.json(err)
    })
}

module.exports.update = (req,res)=>{
    console.log("..")
    const id = req.params.id
    const body = req.body

    if(req.file){
        body.img = {'data' : fs.readFileSync(req.file.path),'contentType' : 'image/jpeg' }
    }
    Note.findByIdAndUpdate(id, body,{new : true, runValidators: true})
     .then((note)=>{
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