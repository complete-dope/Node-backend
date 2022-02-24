const express = require('express')
const Task = require('../models/task')
const router = new express.Router()
const auth = require('../middleware/auth')


router.post('/tasks' ,auth, async(req,res)=>{
    const task = new Task({
        ...req.body, // get all things from the req.body and
        owner :req.user._id
    });
    try{
        await task.save()
        res.status(201).send(task)
    }
    catch(error){
        res.status(404).send(error)
    }
})

//delete this when going for production
// router.get('/tasks',async(req,res)=>{

//     try {
//         const tasks = await Task.find({})
//         res.status(200).send(tasks)
//     } catch (error) {
//         res.status(404).send(error)
//     }
    
// })


router.get('/tasks',auth,async(req,res)=>{

    try {
        // const tasks = await Task.find({})
        await req.user.populate('tasks').execPopulate//using mongoose populate function
        console.log(req.user.tasks);
        res.status(200).send('User tasks are '+req.user.tasks)
    } catch (error) {
        res.status(404).send("The error is "+error)
    }
    
})

//Get a particular task by passing the id 
router.get('/tasks/:id',auth,async (req,res)=>{
    const _id = req.params.id
    try {
        // const task = await Task.findById(_id)
        const task = await Task.findOne({_id ,owner:req.user._id })
        console.log(task);
        if( !task ){ 
            return res.status(404).send() 
        }
        res.status(200).send(task)
    } catch (error) {
        res.status(404).send('Unauthorized access')
    }
    
})

//update the tasks
router.patch('/tasks/:id' , auth ,async(req,res)=>{
    const updates = Object.keys(req.body)//this returns a array of string where the key that the user was willing to attempt will be shown up 
    const allowedUpdate =['description' ,'completed']//to avoid a user to update critical things like id we need to pass up a array of array of things which the user can update and its not necessary that whatever is passed in the req.body can be updated by the user

    //js every function
    const isValidOperation =  updates.every((update)=>{
        return allowedUpdate.includes(update)
    }) // this will return true if all are found and false if even one of them is not found

    if(!isValidOperation){ return res.status(400).send({error:"Invalid updates "})}
    const _id = req.params.id
    try{
        const task = await Task.findOne({_id:req.params.id , owner:req.user._id})
        // const task = await Task.findById(_id)
        await task.save() // this will automatically matchup with the provided model and see if it is correct or not correct  
        // const task  = await Task.findByIdAndUpdate(_id , req.body , {new:true , runValidators:true})
        //no task means task empty
        if(!task){
            res.status(204).send()
        }
        updates.forEach((update)=>{
            task[update] = req.body[update]
        })
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
