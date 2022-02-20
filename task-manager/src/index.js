const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')
const app = express();
const port = process.env.PORT || 3000

//automatically parse the json
app.use(express.json());
//Call for router , create a router similar to the way you called apis and register for a router
app.use(taskRouter)
app.use(userRouter)



//start the server
app.listen(port,()=>{
    console.log("the App has started at port " , port);
})





//whenever a single file gets larger and larger their is  always a potential to break in down in smaller parts by routing them or creating new files and have smaller code in it