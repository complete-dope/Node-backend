const mongoose = require('mongoose')
const validator = require('validator')

const User = mongoose.model('User',{
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
    },
    password:{
        type:String,
        trim:true,
        minlenght:7,
        validate(value){
            // if(value=="password" || value.length<6 ){
            //     throw new Error("You cant keep this as password")
            // }
            if(value.toLowerCase().includes('password')){
                throw new Error('You cant keep "password" as password')
            }
        },
        required:true
    }
})


module.exports =User