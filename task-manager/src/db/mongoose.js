const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api')
console.log("Connected ");

//mongoose is just a add on to mongodb as in it helps to perform more than just basic CRUD operations .
//here we have model and model initialization thing and this is similar to oops in programming languages


// Using datavalidation in mongoose
const user = mongoose.model('Users',{
    name:{
        type:String,

    },
    age:{
        type:Number // If passed a string this should be stored as Number in the database
    }
})

const me = new user({
    name:"Elon",
    age:53
})

me.save().then(() => {
    console.log(me)
}).catch((error) => {
    console.log("Error: "+error)
});


const task = mongoose.model('tasks',{

})