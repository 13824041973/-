/**
function fn(nums) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(nums * 2)
        }, 1000)
    })
}

function* gen() {
    const num1 = yield fn(1)
    const num2 = yield fn(num1)
    const num3 = yield fn(num2)
    return num3
}

function generatorToAsync(generatorFn) {
    return function () {
        return new Promise((resolve, reject) => {
            const g = generatorFn()
            const next1 = g.next()
            next1.value.then(res1 => {
                const next2 = g.next(res1) // 传⼊上次的res1
                next2.value.then(res2 => {
                    const next3 = g.next(res2) // 传⼊上次的res2
                    next3.value.then(res3 => {
                        // 传⼊上次的res3
                        resolve(g.next(res3).value)
                    })
                })
            })
        })
    }
}

const asyncFn = generatorToAsync(gen)
asyncFn().then(res => console.log(res)) // 3秒后输出 8
 */






function fn(nums) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(nums * 2)
        }, 1000)
    })
}

function generatorToAsync(generatorFn) {
    return function () {
        const gen = generatorFn.apply(this, arguments) // gen有可能传参
        // 返回⼀个Promise
        return new Promise((resolve, reject) => {
            function go(key, arg) {
                let res
                try {
                    res = gen[key](arg) // 这⾥有可能会执⾏返回reject状态的Promise
                } catch (error) {
                    return reject(error) // 报错的话会⾛catch，直接reject
                }
                // 解构获得value和done
                const { value, done } = res
                if (done) {
                    // 如果done为true，说明⾛完了，进⾏resolve(value)
                    return resolve(value)
                } else {
                    // 如果done为false，说明没⾛完，还得继续⾛
                    // value有可能是：常量，Promise，Promise有可能是成功或者失败
                    return Promise.resolve(value).then(val => go('next', val), err => go('throw', err))
                }
            }
            go("next") // 第⼀次执⾏
        })
    }
}

function* gen() {
    const num1 = yield fn(1)
    console.log(num1) // 2
    const num2 = yield fn(num1)
    console.log(num2) // 4
    const num3 = yield fn(num2)
    console.log(num3) // 8
    return num3
}

const genToAsync = generatorToAsync(gen)
const asyncRes = genToAsync()
console.log(asyncRes) // Promise
asyncRes.then(res => console.log(res)) // 8