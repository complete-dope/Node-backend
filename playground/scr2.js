// //  using fs for file storage
// const { json } = require('body-parser');
const fs = require('fs');
// const book ={
//     title:"Alchemist",
//     author:"Shakespeare"
// }

// // fs only stores in the string format and book is a object
// const bookJSON = JSON.stringify(book);

// // creates a new file and stores data in it
// fs.writeFileSync('1-json.json' , bookJSON);

const dataBuffer = fs.readFileSync('1-json.json')
console.log(dataBuffer); // this will return a buffer data
console.log(dataBuffer.toString());
const data = JSON.parse(dataBuffer);
console.log(data);