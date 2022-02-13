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

app.get('/' ,(req,res)=>{
    // res.send("Hello")
    res.render('index',{
        title:'Weather',
        name:"Elon"
    })
})

app.get('/weather' ,(req,res)=>{
    // res.send("Hello")
    // res.send({"name":"Elon"})
    if(!req.query.address){
        return res.send({error:"Please enter a search query"})
    }
    res.render('weather',{
        forecast:'Sunny',
        location:"Gurgaon",
        address:req.query.address
    })
})
// app.com -->express server
// app.com/help --> routes

app.get('/help' , (req,res)=>{
    res.render('help');
})


// the values from query strings comes to the request var of the app get 
app.get('/products', (req,res)=>{
    if(!req.query.product){
        return res.send("You must provide a search term ")
    }
    console.log(req.query.product)
    res.send("Request for query")
    // http is a 2 way protocol a request is send and then a response is send back to us and this way we say it to be a 2 way connection only one time a req and one time a res is send back then aagain req and then res
    
})

app.get('/about' ,(req,res)=>{
    res.render('about',{
        title:"About",
        name:"Elon"
    })
    // here title and name are the props that we pass to the (similar to the one we used in the react application)
})

app.get('/help/*' , (req,res)=>{
    res.render('error',{
        title:"Help article not found"
    })
})

// This needs to come at the last always . Express will match line wise and will come to last as we say * everything is a match.
app.get('*',(req,res)=>{
    res.render("error",{
        title:"Page not found"
    })
})

app.listen(5000 ,()=>{
    console.log("server is up");
});