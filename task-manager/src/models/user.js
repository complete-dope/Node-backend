const mongoose = require('mongoose')
const validator = require('validator')
const { Schema } = mongoose;
const bcrypt = require('bcryptjs')

const userSchema = new Schema({
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
        minlength:7,
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

userSchema.pre('save' , async function(next){
    //this function will work before the save method is called

    //here this says that i want to do something before db saves the user --> do "this" before saving him
    const user = this
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password , 8) 
    }
    next() // this is called to get away with the middleware
})

const User = mongoose.model('User',userSchema)

module.exports =User //https://mongoosejs.com/docs/models.html
// WE are doing this to pass schemas successfully and therifore 