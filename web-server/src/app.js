const express= require('express');//express is a function

// we call it to create a new express server
const app =express();

app.get('' ,(req,res)=>{
    res.send("Hello")
})
// app.com -->express server
// app.com/help --> routes

app.get('/help' , ()=>{
    console.log("This is Help function");
})

app.listen(5000 ,()=>{
    console.log("server is up");
});