const express = require("express")
const router = new express.Router()
const auth  = require('../middleware/auth')
const User = require('../models/user') // this loaded the schema and the middleware


//Sign Up
router.post('/users',async (req,res)=>{
    const user = new User(req.body)

    try {
        const token = await user.generateAuthToken()
        await user.save() // before doing this it will check on middle ware if middleware has to say something before saving the user and in our case the middleware was indeed saying something
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
        console.log("the req user is " , req.user);
        console.log("the requser tokens were " , req.user.tokens);
        req.user.tokens = req.user.tokens.filter((token)=>{
            console.log("The token is " ,token);
            var what = token.token !== req.token
            console.log(what);
            return what
        })
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send("This is invalid token")
    }
})
//logout from all devices
router.post('/users/logoutAll' , auth , async(req,res)=>{
    try {
        req.user.tokens =[]
        await req.user.save()
        res.status(200).send("This is it ")
    } catch (error) {
        console.log(error);
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




//for dynamic values in the url we do pass the name with a colon before it
router.get('/users/:id',async(req,res)=>{
    //it contains all the route parameters we have provided
    const _id = req.params.id
    try {
        const user = await User.findById(_id);
        if(!user){ return res.status(404)}
        res.status(200).send(user)
    } catch (error) {
        res.status(404).send(error)
    }
    //this helps to find user by id 
})

//update the users
// options: QueryOptions & { rawResult: true; } -->This is nothing just a indication that you need to pass the object as a parameter here . 

//runvalidators is provided to us by the mongoose and it can be called only on update functions see doc https://mongoosejs.com/docs/validation.html#update-validators
router.patch('/users/:id',async(req,res)=>{
    const updates = Object.keys(req.body)//this returns a array of string where the key that the user was willing to attempt will be shown up 
    const allowedUpdate =['name','email','password','age']//to avoid a user to update critical things like id we need to pass up a array of array of things which the user can update and its not necessary that whatever is passed in the req.body can be updated by the user

    //js "every" function
    const isValidOperation =  updates.every((update)=>{
        return allowedUpdate.includes(update)
    }) // this will return true if all are found and false if even one of them is not found
    
    if(!isValidOperation){ return res.status(400).send({error:"Invalid updates "})}
    const _id = req.params.id;
    //await usage will be where function is returning a promise 
    try {
        //this function will be able to change the password and also encrypt it afterwards
        const user = await User.findById(_id)
        updates.forEach((update)=>{
            user[update] = req.body[update]
        })
        await user.save()
        // const user = await User.findByIdAndUpdate(_id,req.body , {new:true , runValidators:true}) //this function just bypasses mongoose and also doesnt crypt password on updates even after we mentioned it in the models
        // no user
        if(!user){
            return res.status(200).send();
        }
        // updated successfully
        res.status(200).send(user)

    } catch (error) {
        //update unsuccessful
        res.status(404).send("error "+ error)
    }
})

router.delete('/users/:id',async(req,res)=>{
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        if(!user){ return res.status(404).send()}
        res.status(200).send("deleted")
    } catch (error) {
        res.status(400).send({error:"Invalid Id"})
    }
})




module.exports = router

//VERY IMPT
// You cant just call res.status(404) in a return value you have to always put a send with it as even to set 404 as status the 
//do make sure to use + here as it is used to concat 2 things without imposing superiorty over one another
