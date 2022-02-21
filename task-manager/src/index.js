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

const bcrypt = require('bcryptjs');
const myFunction = async()=>{
    const password  = "red12234"
    const hashedPassword = await bcrypt.hash(password,8)
    // hash returns a promise and the number 8 here denotes the number of time we want to the algo to run over the password and make it secure
    
    console.log(hashedPassword);
    console.log(password);
    const ismatch = await bcrypt.compare('red12234' , hashedPassword)
    console.log(ismatch);
}
myFunction()


//hashed method in bcrypt passes a promise as a return function
//whenever a single file gets larger and larger their is  always a potential to break in down in smaller parts by routing them or creating new files and have smaller code in it