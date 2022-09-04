// 手写new
function nene(fn, ...rest) {
    let newObject = {};
    newObject.__proto__ = fn.prototye;
    // 或者用call也行
    fn.apply(newObject, rest)
    return newObject
}
// new方法构造函数做了什么
// 1.创建一个新对象
// 2.将构造函数的this指向新对象
// 3.执行构造函数
// 4.返回新对象

// 构造函数
function construct(name, age) {
    this.name = name
    this.age = age
}


const obj = new construct('刘', 18)
const newObj = nene(construct, '刘六六', 18)

console.log(obj);
console.log(newObj);