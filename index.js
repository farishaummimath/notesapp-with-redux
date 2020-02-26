const express = require('express')
const cors = require('cors')
// npm install mongoose
const setupDB = require('./config/database')
const router = require('./config/routes')
const app = express()// gives app objects
const port = process.env.PORT || 3036
app.use(express.json())
const path = require('path') 


setupDB()
app.use(express.static('public/uploads'))

app.use(cors())


// app.get('/',(req,res) => {
//     //res.send('Welcome to website')
//     // giving json response
//     res.json({
//         notice: 'welcome to website'
//     })

// })

app.use('/api', router )// middleware use function
app.use(express.static(path.join(__dirname,"client/build"))) 
app.get("*",(req,res) => { 
    res.sendFile(path.join(__dirname + "/client/build/index.html")) 
}) 

app.listen(port,()=>{
    console.log("Listening to port ", port)
})