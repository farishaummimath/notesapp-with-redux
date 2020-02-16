const express = require('express')
const fs = require('fs')
const cors = require('cors')
// npm install mongoose
const setupDB = require('./config/database')
const router = require('./config/routes')
const app = express()// gives app objects
const port = 3015

app.use(express.json())


setupDB()
app.use(express.static('public/uploads'))

app.use(cors())


app.get('/',(req,res) => {
    //res.send('Welcome to website')
    // giving json response
    res.json({
        notice: 'welcome to website'
    })

})

app.use('/', router )// middleware use function

app.listen(port,()=>{
    console.log("Listening to port ", port)
})