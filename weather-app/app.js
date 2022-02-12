console.log("starting");

setTimeout(() => {
    console.log("after 2 secs");
}, 2000);

setTimeout(()=>{
    console.log("0 sec timer");
},0)

console.log("stopping");