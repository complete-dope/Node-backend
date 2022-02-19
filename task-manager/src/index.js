const express = require('express')
require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task')
const app = express();
const port = process.env.PORT || 3000

//automatically parse the json
app.use(express.json());



app.post('/users',(req,res)=>{
    const user = new User(req.body)
    user.save().then(() => {
        res.status(201).send(user)
    }).catch((err) => {
        res.status(400).send(err)
    });
})

app.get('/users',(req,res)=>{
    //this is same as we have seen the mongodb find method and here mongoose also provides all of it and this is the only advantage of mongoose over mongodb
    User.find({}).then((result) => {
        res.send(result)
    }).catch((err) => {
        res.status(404).send("Error",err)
    });
})


//for dynamic values in the url we do pass the name with a colon before it
app.get('/users/:id',(req,res)=>{
    console.log(req.params);//it contains all the route parameters we have provided
    const _id = req.params.id
    //this helps to find user by id 
    User.findById(_id).then((user) => {
        if(!user){
            return res.status(404)
        }
        res.status(200).send("User")
    }).catch((err) => {
        res.status(404).send(err)
    });
})

app.post('/tasks' , (req,res)=>{
    const task = new Task(req.body);
    task.save().then(() => {
        res.status(201).send(task)
    }).catch((err) => {
        res.status(404).send(err)
    });
})

app.listen(port,()=>{
    console.log("the App has started at port " , port);
})



//VERY IMPT
// You cant just call res.status(404) in a return value you have to always put a send with it as even to set 404 as status the 