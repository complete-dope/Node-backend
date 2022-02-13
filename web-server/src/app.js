const path = require('path'); // Path Library of NodejS
const express= require('express');//express is a function
const res = require('express/lib/response');
const hbs = require("hbs")
// we call it to create a new express server
const app =express();
const viewsPath = path.join(__dirname  ,"../templates/views" )
const publicDirectoryPath = path.join(__dirname , '../public')
const partialsPath = path.join(__dirname , '../templates/partials')
// app.set() 
app.set('view engine','hbs')
app.set('views' , viewsPath)
hbs.registerPartials(partialsPath)
// app.use() customises server
// setup static directory to serve
app.use(express.static(publicDirectoryPath))
// Routes

app.get('' ,(req,res)=>{
    // res.send("Hello")
    // res.send({"name":"Maanu"})
    res.render('index',{
        title:'Weather',
        name:"Elon"
    })
})
// app.com -->express server
// app.com/help --> routes

app.get('/help' , (req,res)=>{
    res.send("This is Help function");
})

app.get('/about' ,(req,res)=>{
    res.render('about',{
        title:"About",
        name:"Elon"
    })
    // here title and name are the props that we pass to the (similar to the one we used in the react application)
})

app.listen(5000 ,()=>{
    console.log("server is up");
});