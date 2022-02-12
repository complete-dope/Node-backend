const name = "Elon";
const age = 12;

const objectData={
    name :name,
    age :age
}
console.log(objectData);

const objdata={
    name,
    age
}
console.log(objdata);

// They both are same but name should be same of the variable as well as name of the component

const data ={
    location:"usa",
    income :"$123M"
}
// const {location , income} = data; // this is destructuring
// console.log(location);
// console.log(income);

const {location:LocationElon , income , rating =4} = data;
// here LocationElon takes in the same variable data as the location data this is used to rename the value 
console.log(LocationElon);
console.log(rating);
