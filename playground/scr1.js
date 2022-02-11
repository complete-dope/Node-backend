const book ={
    title:"Alchemist",
    author:"Shakespeare"
}
// The above one is object ( javascript object)

// Stringify takes in object / array and converts to a JSON string
const bookjson = JSON.stringify(book);


// Only difference property name as " " made
console.log(bookjson);


console.log(bookjson.title); // cant access this being a string
console.log(book.title); // can be easily accessed


// Json parse opposite of stringfy 
// (converts the )
const parsedData = JSON.parse(bookjson);
console.log(parsedData);