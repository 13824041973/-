// 深拷贝 递归
function deepClone(obj = {}) {
    let result;
    // 如果不是引用数据类型数据
    if (typeof (obj) !== 'object' || obj == null) {
        return obj
    } else if (obj instanceof Array) {
        // 如果是数组
        result = []
    } else {
        // 如果是对象
        result = {}
    }
    // 关键
    for (let key in obj) {
        // 递归，如果是引用类型，要重新拷贝一份
        result[key] = deepClone(obj[key])
    }
    return result
}

let oldObj = {
    name: 'along',
    age: 18,
    skills: [
        'good',
        'study',
        'well'
    ]
};
let newObj = deepClone(oldObj);

newObj.name='wakanda'
newObj.skills[0]='bad'

console.log(oldObj);
console.log(newObj);