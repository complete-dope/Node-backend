const express = require("express")
const router = new express.Router()
const auth  = require('../middleware/auth')
const User = require('../models/user') // this loaded the schema and the middleware
const multer = require('multer')

//Sign Up
router.post('/users',async (req,res)=>{
    const user = new User(req.body)

    try {
        await user.save() // before doing this it will check on middle ware if middleware has to say something before saving the user and in our case the middleware was indeed saying something
        const token = await user.generateAuthToken()
        res.status(201).send({user , token})
    } catch (error) {
        res.status(400).send('error'+error)
    }
})


//Login
router.post('/users/login' , async(req,res)=>{
    try {
        const user = await User.findByCredentials(req.body.email , req.body.password)
        const token = await user.generateAuthToken()

        res.send({user , token})
        // res.send(user)
    } catch (error) {
        res.status(404).send("This request is not valid")
    }
})


//Logout --> from a particular device 
router.post('/users/logout' , auth , async(req,res)=>{
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()

        res.send()
    } catch (e) {
        res.status(500).send()
    }
})
//logout from all devices
router.post('/users/logoutAll' , auth , async(req,res)=>{
    try {
        req.user.tokens =[]
        await req.user.save()
        res.status(200).send("This is it ")
    } catch (error) {
        res.status(500).send()
    }
})



// as in the real world application we dont want people to use up this route to get the details of all the people
router.get('/users',async(req,res)=>{
    //this is same as we have seen the mongodb find method and here mongoose also provides all of it and this is the only advantage of mongoose over mongodb
    try {
        const users = await User.find({});
        res.status(200).send(users)
    } catch (error) {
        res.status(500).send();
    }
})// Delete it Before deployment

router.get('/users/me' , auth , async(res,req)=>{
    res.send(req.user)
})



//update the users
// options: QueryOptions & { rawResult: true; } -->This is nothing just a indication that you need to pass the object as a parameter here . 

//runvalidators is provided to us by the mongoose and it can be called only on update functions see doc https://mongoosejs.com/docs/validation.html#update-validators
router.patch('/users/me',auth,async(req,res)=>{
    const updates = Object.keys(req.body)//this returns a array of string where the key that the user was willing to attempt will be shown up 
    const allowedUpdate =['name','email','password','age']//to avoid a user to update critical things like id we need to pass up a array of array of things which the user can update and its not necessary that whatever is passed in the req.body can be updated by the user

    //js "every" function
    const isValidOperation =  updates.every((update)=>{
        return allowedUpdate.includes(update)
    }) // this will return true if all are found and false if even one of them is not found
    
    if(!isValidOperation){ return res.status(400).send({error:"Invalid updates "})}
    //await usage will be where function is returning a promise 
    try {
        //this function will be able to change the password and also encrypt it afterwards
        updates.forEach((update)=>{
            req.user[update] = req.body[update]
        })
        await req.user.save()
        // const user = await User.findByIdAndUpdate(_id,req.body , {new:true , runValidators:true}) //this function just bypasses mongoose and also doesnt crypt password on updates even after we mentioned it in the models
        // updated successfully
        res.status(200).send(req.user)

    } catch (error) {
        //update unsuccessful
        res.status(404).send("error "+ error)
    }
})

router.delete('/users/me',auth,async(req,res)=>{
    try {
        // const user = await User.findByIdAndDelete(req.user._id)
        // if(!user){ return res.status(404).send()}
        await req.user.remove()
        res.status(200).send("deleted" + req.user)
    } catch (error) {
        res.status(400).send({error:"Invalid Id"})
    }
})


const upload =multer({
    //this is options object
    dest:'avatars',
    limits:{
        fileSize:1000000
    },
    fileFilter(req,file ,cb){
        if(!file.originalname.match(/.(jpg|jpeg|png)$/gm)){
            cb(new Error ("The file has not been matched"))
        }
        cb(undefined , true)
    }


})
router.post('/users/me/avatar' , upload.single('avatar') ,(req,res)=>{
    res.send()
} ) // as you are sending .. fieldname should be same as the form-data key as mentioned in either your form or in either of api call (very impt)


module.exports = router

//VERY IMPT
// You cant just call res.status(404) in a return value you have to always put a send with it as even to set 404 as status the 
//do make sure to use + here as it is used to concat 2 things without imposing superiorty over one another
