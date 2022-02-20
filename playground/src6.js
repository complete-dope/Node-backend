const doWork =async()=>{
    return "mohit"
}

const add=(a,b)=>{
    setTimeout(() => {
        return a+b
    }, 2000);
}

const ans =async()=>{
    const sum1 = await add(1,2);
    const sum2 = await add(sum1,2);
    return sum2;
}

ans().then((result) => {
    console.log(result)
}).catch((err) => {
    console.log(err)
});

// doWork().then((result) => {
//     console.log("result " + result)
// }).catch((err) => {
//     console.log("failed"+err)
// });