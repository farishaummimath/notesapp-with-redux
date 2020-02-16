const User = require('../models/user')
const _ = require('lodash')


module.exports.list = (req, res) => {
    User.find()
        .then(user => res.json(user))
        .catch(err => res.json(err))
}

module.exports.register = (req,res)=>{
    const body = req.body
    const user = new User(body)
    user.save()
   .then(function(user){
       res.send(_.pick(user,['_id','username','email']))
   })
   .catch(err=> res.send(err))
    
}
module.exports.login = (req,res)=>{
    const body = req.body
    // own static method
    let user
    User.findByCredentials(body.email,body.password)
        .then(userFound=>{
            // create own instance method
            // generate token and write to db. it is async op so return promise
            user = userFound
            return user.generateToken()
            // res.send(user)
        })
        .then(token=>{
            //res.send(token)// token not in body
            // instead send in header- new prop and value
            //once user su
            user = {_id:user._id, username: user.username, email: user.email}
            res.json({
                token,
                user
            })
            //res.setHeader('x-auth',token).json({})
        })
        .catch(function(err){
            res.send(err)
        })

}
module.exports.account = (req,res)=>{
    const { user } = req
    res.send(_.pick(user,['id','username','email']))

}
module.exports.logout = (req,res)=>{
    const {user,token} = req
    User.findByIdAndUpdate(user._id,{$pull:{tokens:{token}}})
        .then(function(){
            res.send({notice:'successfully logged out'})
        })
        .catch(function(err){
            res.send(err)
        })
}

module.exports.destroy = (req, res) => {
    const id = req.params.id
    User.findByIdAndDelete(id)
        .then(user => user ? res.json(user) : res.json({}))
        .catch(err => res.json(err))
}