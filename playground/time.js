const moment = require('moment');

let date = moment();
date.add(100, 'year').subtract(9, 'months').add(4, 'hours');
console.log(date.format('MMM Do YYYY h:mm:ss a'));
console.log(date.format('h:mm a'));