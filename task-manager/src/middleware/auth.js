// This is what we call MiddleWare

const jwt=require('jsonwebtoken')
const User = require('../models/user')
const auth = async(req,res,next)=>{
    try {
        const token = req.header('Authorization').replace('Bearer ' ,"")
        const decoded = jwt.verify(token , "thisisanewupdate")
        const user = await User.findOne({_id:decoded._id , "tokens.token":token})
        if(!user){
            throw new Error()
        }
        req.user = user // this line creates wonders as when the user get authenticate we are passing the user as a request header
        next()
        // console.log(decoded);
    } catch (error) {
        res.status(401).send({error:"Please authenticate"})
    }
}

module.exports = auth
// Adding up value in our header for the autherization of the token  