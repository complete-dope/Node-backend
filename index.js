const Greet = "Hello World";
console.log(Greet);

// additional info as node ./index.js Elon
// Here Elon is the extra info and we can use it as an input to our program

console.log(process.argv); // returns a path
// 1st path --> Nodejs installed at your computer
// 2nd path --> The path of this file 
// 3rd path --> The extra input passed as an input
// nth path --> As the number of inputs passed to the console 

console.log(process.argv[2]); // Elon

const input_val =process.argv[2];
if(input_val=="Elon"){
    console.log("SpaceX");
}
else{
    console.log("Blue Origin");
}