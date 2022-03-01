const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    description:{
        type:String,
        trim:true,
        required:true
    },
    completed:{
        type:Boolean,
        default:false
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User' // this sets the reference to different model in this case it is 'User'
    }
},{
    timestamps:true
})

// as it will be difficult to know which task which user created so we need to provide each task with a id of the user which created it and for this i will be providing a new entry in schema of name owner and that will store the id of user
const Task = mongoose.model('Task' , taskSchema)
module.exports = Task