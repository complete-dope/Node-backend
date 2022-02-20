const express = require('express')
require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task')
const app = express();
const port = process.env.PORT || 3000

//automatically parse the json
app.use(express.json());

////////////USERS///////////////

app.post('/users',async (req,res)=>{
    const user = new User(req.body)

    try {
        await user.save()
        res.status(201).send(user)
    } catch (error) {
        res.status(400).send('error'+error)
    }
})

app.get('/users',async(req,res)=>{
    //this is same as we have seen the mongodb find method and here mongoose also provides all of it and this is the only advantage of mongoose over mongodb
    try {
        const users = await User.find({});
        res.status(200).send(users)
    } catch (error) {
        res.status(500).send();
    }
})


//for dynamic values in the url we do pass the name with a colon before it
app.get('/users/:id',async(req,res)=>{
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
app.patch('/users/:id',async(req,res)=>{
    const updates = Object.keys(req.body)//this returns a array of string where the key that the user was willing to attempt will be shown up 
    const allowedUpdate =['name','email','password','age']//to avoid a user to update critical things like id we need to pass up a array of array of things which the user can update and its not necessary that whatever is passed in the req.body can be updated by the user

    //js every function
    const isValidOperation =  updates.every((update)=>{
        return allowedUpdate.includes(update)
    }) // this will return true if all are found and false if even one of them is not found
    
    if(!isValidOperation){ return res.status(400).send({error:"Invalid updates "})}
    const _id = req.params.id;
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

app.delete('/users/:id',async(req,res)=>{
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        if(!user){ return res.status(404).send()}
        res.status(200).send("deleted")
    } catch (error) {
        res.status(400).send({error:"Invalid Id"})
    }
})

////////////TASKS///////////////

app.post('/tasks' , async(req,res)=>{
    const task = new Task(req.body);
    try{
        await task.save()
        res.status(201).send(task)
    }
    catch(error){
        res.status(404).send(error)
    }
})


app.get('/tasks',async(req,res)=>{

    try {
        const tasks = await Task.find({})
        res.status(200).send(tasks)
    } catch (error) {
        res.status(404).send(error)
    }
    
})

//Get the task
app.get('/tasks/:id',async (req,res)=>{
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
app.patch('/tasks/:id' , async(req,res)=>{
    const updates = Object.keys(req.body)//this returns a array of string where the key that the user was willing to attempt will be shown up 
    const allowedUpdate =['description' ,'completed']//to avoid a user to update critical things like id we need to pass up a array of array of things which the user can update and its not necessary that whatever is passed in the req.body can be updated by the user

    //js every function
    const isValidOperation =  updates.every((update)=>{
        return allowedUpdate.includes(update)
    }) // this will return true if all are found and false if even one of them is not found

    if(!isValidOperation){ return res.status(400).send({error:"Invalid updates "})}
    const _id = req.params.id
    try{
        const task  = await Task.findByIdAndUpdate(_id , req.body , {new:true , runValidators:true})
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

app.delete('/tasks/:id' , async(req,res)=>{
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


//start the server
app.listen(port,()=>{
    console.log("the App has started at port " , port);
})



//VERY IMPT
// You cant just call res.status(404) in a return value you have to always put a send with it as even to set 404 as status the 
//do make sure to use + here as it is used to concat 2 things without imposing superiorty over one another