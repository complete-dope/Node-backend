const path = require('path'); // Path Library of NodejS
const express= require('express');//express is a function
const res = require('express/lib/response');
console.log(__dirname);
console.log(__filename);
console.log(path.join(__dirname  ,"../public/index.html"));

// we call it to create a new express server
const app =express();

// app.use() customises server
app.use(express.static(path.join(__dirname  ,"../public")))

app.get('' ,(req,res)=>{
    // res.send("Hello")
    res.send({"name":"Maanu"})
})
// app.com -->express server
// app.com/help --> routes

app.get('/help' , (req,res)=>{
    res.send("This is Help function");
})

app.get('/about' ,(req,res)=>{
    res.send('<h1>Hello About</h1>')
})

app.listen(5000 ,()=>{
    console.log("server is up");
});