const express = require('express')
const router = express.Router()
const multer = require('multer')
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './uploads')
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname)
    }
})

const fileFilter = (req,file,cb) => {
    if(file.mimetype === "image/jpg"  || file.mimetype ==="image/jpeg"  || file.mimetype ===  "image/png") {
        cb(null, true)
    }
    else{
      cb(new Error("Image uploaded is not of type jpg/jpegcor png"),false)
    }
}
const upload = multer({storage: storage,fileFilter : fileFilter})

const notesController = require('../app/controllers/notesController')//empty object by default
const categoriesController = require('../app/controllers/categoriesController')//empty object by default

router.get('/notes',notesController.list)
router.post('/notes',upload.single('file'),notesController.create)
router.get('/notes/:id',notesController.show)
router.put('/notes/:id',upload.single('file'),notesController.update)
router.delete('/notes/:id',notesController.destroy)

router.get('/categories',categoriesController.list)
router.post('/categories',categoriesController.create)
router.get('/categories/:id',categoriesController.show)
router.put('/categories/:id',categoriesController.update)
router.delete('/categories/:id',categoriesController.destroy)


module.exports = router