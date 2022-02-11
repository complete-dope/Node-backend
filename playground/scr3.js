//  leo
// first get data
// second parse data
// third change the data
// fourth and get it back

const fs = require('fs');

const Bufferdata = fs.readFileSync('2-json.json');
const data = JSON.parse(Bufferdata);
data.name = "manu";
data.age = 19;
console.log(data);

