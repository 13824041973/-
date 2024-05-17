const vm = require('vm');

const code = 'x + y';
const script = new vm.Script(code);

const context = { x: 10, y: 20 };
const result = script.runInNewContext(context);

console.log(result);  // 输出: 30
