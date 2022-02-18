const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api')
const validator = require('validator')
// Rather than making custom validators here we are usign the library provided by npm called validator js

console.log("Connected ");

//mongoose is just a add on to mongodb as in it helps to perform more than just basic CRUD operations .
//here we have model and model initialization thing and this is similar to oops in programming languages


// Using datavalidation in mongoose
const user = mongoose.model('Users',{
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        validate(value){
            //value is email here
            if(!validator.isEmail(value)){
                throw new Error("This is not a Email")
            }
        }
    },
    age:{
        type:Number, // If passed a string this should be stored as Number in the database
        //here we are providing custom validation
        default:0,
        validate(value){
            if(value<0){
                throw new Error("Age should be positive")
            }
        }
    }
})

const me = new user({
    name:"  Elon  ",
    email:"helo@gmail.com  "
})

me.save().then(() => {
    console.log(me)
}).catch((error) => {
    console.log("Error: "+error)
});


const task = mongoose.model('tasks',{

})