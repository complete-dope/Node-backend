const { argv, string } = require("yargs");
const yargs = require("yargs")
const notesArr = require('./notes') // notes is an object with 2 values

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

console.log(yargs.argv);
// this is just an updated way of parsing sent elements to the CLI and retrieving them 

yargs.command({
    command:"add",
    describe:"This is used to add new note",
    builder:{
        title:{
            describe:"Note to be Added",
            demandOption : true,
            type:'string'
        },
        body:{
            describe:"This is body",
            demandOption:true,
            type: 'string'
        }
    },
    handler:function(argv){
        console.log("Title is : " , argv.title );
        console.log("body is : " , argv.body );
        notesArr.addNote(argv.title , argv.body);
    }
})

yargs.command({
    command:"remove",
    describe:"Remove a note",
    builder:{
        title:{
            describe:"Title to be deleted",
            demandOption:true,
            type:'string'
        }
    },
    handler: function(argv){
        console.log("removing a note");
        notesArr.removeNote(argv.title);
    }
})

yargs.command({
    command:"list",
    describe:"List a note",
    handler:function(){
        console.log("listing the note");
    }
})

yargs.command({
    command:"read",
    describe:"read a note",
    handler:function(){
        console.log("reading the note");
    }
})


yargs.parse(); // parsing the objects 
// console.log(yargs.argv);