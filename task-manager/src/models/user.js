const mongoose = require('mongoose')
const validator = require('validator')
const { Schema } = mongoose;
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        unique:true,
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
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]//this will be an array
} ,{ 
    timestamps:true // this will add a date field to it and 
})

//making a  virtual attribute
userSchema.virtual('tasks' , {
    ref:'Task',
    localField:'_id',
    foreignField:'owner'
})


//To prevent sending private data back to the client we are using this function
userSchema.methods.toJSON = function(){
    const user = this
    const userObject = user.toObject()
    delete userObject.password
    delete userObject.tokens
    return userObject
}



userSchema.methods.generateAuthToken = async function(){ // methods means this thing will be changed over the particular user that we are calling it for and not over the whole "User" 
    const user = this
    const token = jwt.sign({ _id:user._id.toString() },"thisisanewupdate")

    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}


userSchema.statics.findByCredentials = async(email,password)=>{ // statics means this thing will be changed over the whole of User 
    const user = await User.findOne({email})
    if(!user){
        throw new Error ("Unable to Login")
    }
    const isMatch = await bcrypt.compare(password , user.password )
    if(!isMatch){
        throw new Error("Unable to Login")
    }
    return user
}//here we are creating a new function and this is a set format for this

//hash the plain text password
userSchema.pre('save' , async function(next){
    //this function will work before the save method is called

    //here this says that i want to do something before db saves the user --> do "this" before saving him
    const user = this
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password , 8) 
    }
    next() // this is called to get away with the middleware
})

const User = mongoose.model('User',userSchema)//here the string defines the collection where the data will be stored and the collection name has some constrains that it cant be capital letters and will add "s" to it if its terminating with ~s and will add "es" if ending with 

module.exports =User //https://mongoosejs.com/docs/models.html
// WE are doing this to pass schemas successfully and therifore 