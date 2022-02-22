const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')
const app = express();
const port = process.env.PORT || 3000

//Route handling here
app.use((req,res , next)=>{
    if(req.method === "GET"){
        res.send("get request is disabled")
    }else{
        next()
    }
    console.log(req.method , req.path);
    next()
})//without using next the middleware would just get stuck in the between
// Under maintaince
app.use((req,res,next)=>{
    if(req.method !== ""){
        return res.status(503).send("Under Maintaince")
    }
    next()
})

//automatically parse the json to the object form 
app.use(express.json());
//Call for router , create a router similar to the way you called apis and register for a router
app.use(taskRouter)
app.use(userRouter)



//start the server
app.listen(port,()=>{
    console.log("the App has started at port " , port);
})
// this is token for login the user and earlier one was just a 
// const jwt = require('jsonwebtoken')
// const myfunction =async ()=>{
//     const token = jwt.sign({ _id:'abc123' },'this is a new thing', {expiresIn:'2 seconds'})
//     console.log(token);
//     const data = jwt.verify(token , 'this is a new thing')
//     console.log(data);
// }
// myfunction()

//hashed method in bcrypt passes a promise as a return function
//whenever a single file gets larger and larger their is  always a potential to break in down in smaller parts by routing them or creating new files and have smaller code in it

// Usage of JWT as a user wants to get thru many of the activities where authentication is required theirfore we generate jwt so that user can verify himself on all the required places and will not have to login again and again 
// jWT is made up of 3 parts header , payload(data we provided) , signature(the string which we have provided up their act as a secret )
// wrkflow is use jwt token to create a token for users and then use jwt verify to verify the user 

