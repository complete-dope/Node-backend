// This is calllback
// setTimeout(() => {
//     console.log("this i settimeout");
// }, 2000);

const add =(a,b,callback)=>{
    setTimeout(()=>{
        callback(a+b);
    },2000)
}

add(2,4,(sum)=>{
    console.log(sum);
})