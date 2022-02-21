const express = require("express")
const router = new express.Router()

const User = require('../models/user')

router.post('/users',async (req,res)=>{
    const user = new User(req.body)

    try {
        await user.save()
        res.status(201).send(user)
    } catch (error) {
        res.status(400).send('error'+error)
    }
})

router.get('/users',async(req,res)=>{
    //this is same as we have seen the mongodb find method and here mongoose also provides all of it and this is the only advantage of mongoose over mongodb
    try {
        const users = await User.find({});
        res.status(200).send(users)
    } catch (error) {
        res.status(500).send();
    }
})


//for dynamic values in the url we do pass the name with a colon before it
router.get('/users/:id',async(req,res)=>{
    console.log(req.params);//it contains all the route parameters we have provided
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

    //js every function
    const isValidOperation =  updates.every((update)=>{
        return allowedUpdate.includes(update)
    }) // this will return true if all are found and false if even one of them is not found
    
    if(!isValidOperation){ return res.status(400).send({error:"Invalid updates "})}
    const _id = req.params.id;
    //await usage will be where function is returning a promise 
    try {
        const user = await User.findByIdAndUpdate(_id,req.body , {new:true , runValidators:true})
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
