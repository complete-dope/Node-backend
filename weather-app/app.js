const request = require('request');
// request version 2.88.0
const address = "Gurgaon"
const url = "https://api.weatherapi.com/v1/current.json?key=4af4dda2afeb4dfab5d81100221202&q="+encodeURIComponent(address)+"&aqi=yes";
// encode uri because is someone sends a special character the site will crash up but when encoded it can be handled

request({url:url , json:true} , (error , response)=>{
    // json=true will automatically parse the json into object 
    // const data = JSON.parse(response.body);
    // console.log("The current temp is " +data.current.temp_c);
    // console.log("The weather their is "+data.current.condition.text);
    if(error){
        console.log("Cant connect to api");
    }else{
        const data = response.body;
        console.log("The current temp is " +data.current.temp_c);
        console.log("The weather their is "+data.current.condition.text);
    }
})

// if the api takes in coordinates we can change it to string input using the mapbox
// body ke andar response hai sara