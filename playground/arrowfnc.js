// const event ={
//     celeb:"Birthday",
//     name:[" Elon"," maye"," ash"],
//     wishhim : function(){
//         console.log("happy " +this.celeb );
//         this.name.forEach(function(){
//             console.log("Happy birthday "+this.name);
//         })
//     }
// }
// event.wishhim();


// but in arrow function we couldnot use this variable

// const event ={
//     celeb:"Birthday",
//     name:" Elon",
//     wishhim :()=>{
//         console.log("happy " +this.celeb + this.name);
//     }
// }
// event.wishhim(); // this will give undefined


// standard functions have their own this binding so when this is passed inside them they start thinking that this is for them . The parsing of 'this' works upto one one function but when passed a func in func this fails . Theirfore in these cases arrow function is a great here

const event ={
    celeb:"Birthday",
    name:[" Elon"," maye"," ash"],
    wishhim : function(){
        console.log("happy " +this.celeb );
        this.name.forEach(()=>{
            console.log("Happy birthday "+this.name);
        })
    }
}
event.wishhim();