var parser = require('./');
console.log(parser);
var fs = require('fs');

var data = fs.readFileSync('./1.srt', 'utf-8');
var z = parser.fromSrt(data,1);
z = parser.toSrt(z);

console.log(z);
