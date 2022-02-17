// CRUD operations

// for creating data we use insert and insertOne
// for reading data we use find and findOne
// for updating data we use update and updateOne
// for deleting we use delete 
const mongodb = require('mongodb') // mongodb version 3.1.10
const MongoClient =  mongodb.MongoClient
const connectionURL =  'mongodb://127.0.0.1:27017' //this is the default url for connection string
const ObjectID = mongodb.ObjectId
const databaseName ='task-manager' // this is the name of the database we want our data to be stored in 
// here in the below linr we harness the power of mongoclient connection request
// newurlparser means that remove the default url and from now use the url which i have provided to you
const id = new ObjectID()
console.log(id);
console.log(id.getTimestamp()); // this shows that the id also encodes timestamp in it in its starting 4 bits
console.log(id.id.length);// this is of length 12 bits
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
    // db.collection('users').insertMany([
    //     {
    //         name:"Joe",
    //         age:35
    //     },
    //     {
    //         name:"Monica",
    //         age:28
    //     }
    // ],(error , result)=>{
    //     if(error){
    //         return console.log("unable to insert user");
    //     }
    //     console.log("i am here");
    //     console.log(result);
    // })

    //finding the data of a person by passing its name
    db.collection('users').findOne({name:"Joe"} , (error , user)=>{
        if(error){
            return console.log("their was an error");
        }
        console.log(user);
    })

    db.collection('users').find({age:52}).toArray((error , users)=>{
        console.log(users);
    })
    //returns all the values with age = 52 and returns the array of them

    // for update we need to pass the $set object
    // https://docs.mongodb.com/manual/reference/operator/update/
    db.collection('users').insertMany([
        {
            name:"raman",
            age:12
        },
        {
            name:"rohit",
            age:12
        }
    ])
    // update one and update many
    db.collection('users').updateOne(
        { _id : new ObjectID("620d12e4d0c0a51b503d6a0d") },{
        $set:{
            name:"tribiani"
        } ,
        $inc:{
            age:1
        }
    })

    db.collection('users').updateMany({age:12},{
        $inc:{
            age:1
        }
    })

    //delete one and delete many
    db.collection('users').deleteMany({age:14})
    db.collection('users').deleteOne({name:'Elon'})
})

 
