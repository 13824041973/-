var { counter, incCounter } = require('./lib')

console.log(counter);
incCounter()
console.log(counter);

console.log(require('./lib').counter);