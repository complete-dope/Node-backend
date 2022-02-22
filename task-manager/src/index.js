const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')
const app = express();
const port = process.env.PORT || 3000

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


// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjE0YzVjZWMzZTEzNWM1ZjEyMjY1NWYiLCJpYXQiOjE2NDU1Mjk3NTR9.XEhrpiJx-JezE91hm5nlwpKEFlI79f_M0-j9SFpnh-I
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjE0YzVjZWMzZTEzNWM1ZjEyMjY1NWYiLCJpYXQiOjE2NDU1Mjk4MjV9.UOOK_ARM9ckMkBDzk-UyRu5xsuBe0NN0Eg2Zb61-PUM