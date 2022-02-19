const mongoose = require('mongoose')



mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api' ,{
    useNewUrlParser:true
})

// Rather than making custom validators here we are usign the library provided by npm called validator js

//mongoose is just a add on to mongodb as in it helps to perform more than just basic CRUD operations .
//here we have model and model initialization thing and this is similar to oops in programming languages



// REST = representaional state transfer 
// It is serverless operation and it allows us ot interact with the person
// method / polarised version of test eg . POST/create  get/read  patch/update/:id  delete/delete/:id