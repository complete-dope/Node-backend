const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express();
const port = process.env.PORT || 3000


//automatically parse the json to the object form 
app.use(express.json());
//Call for router , create a router similar to the way you called apis and register for a router
app.use(userRouter)
app.use(taskRouter)



//start the server
app.listen(port,()=>{
    console.log("the App has started at port " , port);
})
//jwt is just a token providing service --> sign and verify
//bcrypt hashes password --> hash and compare

//hashed method in bcrypt passes a promise as a return function
//whenever a single file gets larger and larger their is  always a potential to break in down in smaller parts by routing them or creating new files and have smaller code in it

// Usage of JWT as a user wants to get thru many of the activities where authentication is required theirfore we generate jwt so that user can verify himself on all the required places and will not have to login again and again 
// jWT is made up of 3 parts header , payload(data we provided) , signature(the string which we have provided up their act as a secret ) if the first argument is sent as a string then the token will also be modified in itself and will have only 2 forms __.__
// wrkflow is use jwt token to create a token for users and then use jwt verify to verify the user 
//

const jwt = require('jsonwebtoken')
const token = jwt.sign({_id:"manu"},"newone")
console.log("Token is "+token);
const decode = jwt.verify(token , 'newone')
console.log(decode);
console.log("decoded string is "+decode._id);

