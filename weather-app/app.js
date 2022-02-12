const request = require('request');
// request version 2.88.0

const url = "https://api.weatherapi.com/v1/current.json?key=4af4dda2afeb4dfab5d81100221202&q=Kerala&aqi=yes"

request({url:url , json:true} , (error , response)=>{
    // json=true will automatically parse the json into object 
    // const data = JSON.parse(response.body);
    // console.log("The current temp is " +data.current.temp_c);
    // console.log("The weather their is "+data.current.condition.text);
    const data = response.body;
    console.log("The current temp is " +data.current.temp_c);
    console.log("The weather their is "+data.current.condition.text);
})

// body ke andar response hai sara