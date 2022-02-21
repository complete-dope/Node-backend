const express = require('express')
const Task = require('../models/task')
const router = new express.Router()


router.post('/tasks' , async(req,res)=>{
    const task = new Task(req.body);
    try{
        await task.save()
        res.status(201).send(task)
    }
    catch(error){
        res.status(404).send(error)
    }
})


router.get('/tasks',async(req,res)=>{

    try {
        const tasks = await Task.find({})
        res.status(200).send(tasks)
    } catch (error) {
        res.status(404).send(error)
    }
    
})

//Get the task
router.get('/tasks/:id',async (req,res)=>{
    const _id = req.params.id
    try {
        const task = await Task.findById(_id)
        if(!task){ return res.status(404)}
        res.status(200).send(task)
    } catch (error) {
        res.status(404).send(error)
    }
    
})

//update the tasks
router.patch('/tasks/:id' , async(req,res)=>{
    const updates = Object.keys(req.body)//this returns a array of string where the key that the user was willing to attempt will be shown up 
    const allowedUpdate =['description' ,'completed']//to avoid a user to update critical things like id we need to pass up a array of array of things which the user can update and its not necessary that whatever is passed in the req.body can be updated by the user

    //js every function
    const isValidOperation =  updates.every((update)=>{
        return allowedUpdate.includes(update)
    }) // this will return true if all are found and false if even one of them is not found

    if(!isValidOperation){ return res.status(400).send({error:"Invalid updates "})}
    const _id = req.params.id
    try{
        const task = await Task.findById(_id)
        updates.forEach((update)=>{
            task[update] = req.body[update]
        })
        await task.save() // this will utomatically matchup with the provided model and see if it is correct or not correct  
        // const task  = await Task.findByIdAndUpdate(_id , req.body , {new:true , runValidators:true})
        //no task means task empty
        if(!task){
            res.status(204).send()
        }
        // update task
        res.status(202).send(task)
    }catch(e){
        //unsuccessful
        res.status(400).send(e)
    }
})

router.delete('/tasks/:id' , async(req,res)=>{
    try {
        const task = await Task.findByIdAndDelete(req.params.id)
        //task is not available
        if(!task){return res.status(404).send()}
        //task is found
        res.status(200).send("Task deleted ")
    } catch (error) {
        // task not found
        res.status(400).send({error:"Error occured"})
    }
})


module.exports = router

//VERY IMPT
// You cant just call res.status(404) in a return value you have to always put a send with it as even to set 404 as status the 
//do make sure to use + here as it is used to concat 2 things without imposing superiorty over one another
