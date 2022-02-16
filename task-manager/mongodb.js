// CRUD operations
const mongodb = require('mongodb') // mongodb version 3.1.10
const MongoClient =  mongodb.MongoClient
const connectionURL =  'mongodb://127.0.0.1:27017' //this is the default url for connection string
const databaseName ='task-manager' // this is the name of the database we want our data to be stored in 
// here in the below linr we harness the power of mongoclient connection request
// newurlparser means that remove the default url and from now use the url which i have provided to you

MongoClient.connect(connectionURL,{useNewUrlParser:true},(error , client)=>{
    if(error){
        console.log("unable to connect to database");
        return 
    }
    console.log("Connected correctly");
    const db =client.db(databaseName)//mongodb will automatically download this for us we dont need to create manually a db name of task-manager
    // db.collection('users').insertOne({
    //     name:"Elon",
    //     age:52
    // },(error , result)=>{
    //     if(error){
    //         return console.log("unable to insert user");
    //     }
    //     console.log("i am here");
    //     console.log(result);
    // })
    //this creates a database named task-manager with a collection called users and it will have this data in it .
    db.collection('users').insertMany([
        {
            name:"Joe",
            age:35
        },
        {
            name:"Monica",
            age:28
        }
    ],(error , result)=>{
        if(error){
            return console.log("unable to insert user");
        }
        console.log("i am here");
        console.log(result);
    })
})

