console.log("starting");

setTimeout(() => {
    console.log("after 2 secs");
}, 2000);

setTimeout(()=>{
    console.log("0 sec timer");
},0)

console.log("stopping");
// This is about the call stack and callback queue 
// call stack takes the js functions in it and the functions like settimeout is a node api function and it goes in the callback queue whereas normal functions goes in the call stack and callback queue functions will always be called after the call stack function 