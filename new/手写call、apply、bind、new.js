/**
 * call
 *  // 第一版
Function.prototype.myCall1 = function (ctx) {
    ctx.fn = this
    ctx.fn()
    delete ctx.fn
}

// 第二版
Function.prototype.myCall2 = function (ctx, ...rest) {
    ctx.fn = this
    ctx.fn(...rest)
    delete ctx.fn
}

// 第三版
Function.prototype.myCall3 = function (ctx, ...rest) {
    ctx = (ctx === null || ctx === undefined) ? globalThis : Object(ctx)
    ctx.fn = this
    const result = ctx.fn(...rest)
    delete ctx.fn
    return result
}

// call 第四版
Function.prototype.myCall = function (ctx, ...rest) {
    ctx = (ctx === null || ctx === undefined) ? globalThis : Object(ctx)
    const key = Symbol("temp")
    ctx[key] = this
    const result = ctx[key](...rest)
    delete ctx[key]
    return result
}
 */






// apply
// Function.prototype.myApply = function (ctx, arr) {
//     if (arr !== null && arr !== undefined && typeof arr[Symbol.iterator] !== 'function') {
//         throw new Error('第二个参数必须为iterator对象')
//     }
//     ctx = (ctx === null || ctx === undefined) ? globalThis : Object(ctx)
//     const key = Symbol("temp")
//     ctx[key] = this
//     const result = arr ? ctx[key](...arr) : ctx[key]()
//     delete ctx[key]
//     return result
// }

// var value = 0
// let foo = {
//     value: 1
// }

// function bar(a, b) {
//     console.log(this.value);
//     return a + b
// }

// console.log(bar.myApply(foo, [2, 3]));


















/**
 * // bind
var value = 2
var foo = {
    value: 1
}

function bar(a, b) {
    this.habit = 'shopping'
    console.log(this.value);
    console.log(a);
    console.log(b);
}


// 第一版
Function.prototype.myBind1 = function (ctx) {
    const fn = this
    return function () {
        return fn.apply(ctx)
    }
}
// const bindBar = bar.myBind1(foo)
// bindBar()

// 第二版
Function.prototype.myBind2 = function (ctx) {
    const fn = this
    const args = Array.prototype.slice.call(arguments, 1)
    return function () {
        const bindArgs = Array.prototype.slice.call(arguments)
        return fn.apply(ctx, args.concat(bindArgs))
    }
}
// const bindBar = bar.myBind2(foo, 12)
// bindBar(13)

// 第三版
Function.prototype.myBind3 = function (ctx) {
    const fn = this
    const args = Array.prototype.slice.call(arguments, 1)
    const fBound = function () {
        const bindArgs = Array.prototype.slice.call(arguments)
        return fn.apply(this instanceof fBound ? this : ctx, args.concat(bindArgs))
    }
    fBound.prototype = this.prototype
    return fBound
}
// const bindBar = bar.myBind3(foo, 22)
// const binBarNew = new bindBar(33)

// 第四版
Function.prototype.myBind4 = function (ctx) {
    const fn = this
    const args = Array.prototype.slice.call(arguments, 1)
    const fNop = function () { }
    const fBound = function () {
        const bindArgs = Array.prototype.slice.call(arguments)
        return fn.apply(this instanceof fNop ? this : ctx, args.concat(bindArgs))
    }
    // fBound.prototype = this.prototype
    fNop.prototype = this.prototype
    fBound.prototype = new fNop()
    return fBound
}

// 最终版
// 防止调用该函数的this为非函数
Function.prototype.myBind = function (ctx) {
    if (typeof this !== 'function') {
        throw new Error("Function.prototype.myBind - what is trying to be bound is not callable")
    }
    if (ctx === undefined || ctx === null) ctx = globalThis
    const fn = this
    const args = Array.prototype.slice.call(arguments, 1)
    const fNop = function () { }
    const fBound = function () {
        const bindArgs = Array.prototype.slice.call(arguments)
        return fn.apply(this instanceof fNop ? this : ctx, args.concat(bindArgs))
    }
    // fBound.prototype = this.prototype
    fNop.prototype = this.prototype
    fBound.prototype = new fNop()
    return fBound
}
const bindBar = bar.myBind(foo, 22)
const binBarNew = new bindBar(33)
 */





/**
 * new.
function myNew1(fn) {
    if (typeof fn !== "function") throw new TypeError(`${fn} is not a constructor`)
    const obj = new Object()
    obj.__proto__ = fn.prototype
    const result = fn.apply(obj, Array.prototype.slice.call(arguments, 1))
    return typeof result === 'object' ? result : obj
}

function Per(name, age) {
    this.str = 60;
    this.age = age
    return {
        name
    }
}
Per.prototype.sayHi = () => {
    console.log('hi');
}

const son = myNew1(Per, 11, 22)
console.log(son.name); // 11
console.log(son.age); // undefined
son.sayHi() // 报错 不是函数
 */










class MyPromise {
    // 构造⽅法
    constructor(executor) {
        // 初始化值
        this.initValue()
        // 初始化this指向
        this.initBind()
        try {
            // 执⾏传进来的函数
            executor(this.resolve, this.reject)
        } catch (e) {
            // 捕捉到错误直接执⾏reject
            this.reject(e)
        }
    }
    initBind() {
        // 初始化this
        this.resolve = this.resolve.bind(this)
        this.reject = this.reject.bind(this)
    }
    initValue() {
        // 初始化值
        this.PromiseResult = null // 终值
        this.PromiseState = 'pending' // 状态
        this.onFulfilledCallbacks = [] // 保存成功回调
        this.onRejectedCallbacks = [] // 保存失败回调
    }
    resolve(value) {
        // state是不可变的
        if (this.PromiseState !== 'pending') return
        // 如果执⾏resolve，状态变为fulfilled
        this.PromiseState = 'fulfilled'
        // 终值为传进来的值
        this.PromiseResult = value
        // 执⾏保存的成功回调
        while (this.onFulfilledCallbacks.length) {
            this.onFulfilledCallbacks.shift()(this.PromiseResult)
        }
    }
    reject(reason) {
        // state是不可变的
        if (this.PromiseState !== 'pending') return
        // 如果执⾏reject，状态变为rejected
        this.PromiseState = 'rejected'
        // 终值为传进来的reason
        this.PromiseResult = reason
        // 执⾏保存的失败回调
        while (this.onRejectedCallbacks.length) {
            this.onRejectedCallbacks.shift()(this.PromiseResult)
        }
    }
    then(onFulfilled, onRejected) {
        // 接收两个回调 onFulfilled, onRejected
        // 参数校验，确保⼀定是函数
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : val => val
        onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason }
        var thenPromise = new MyPromise((resolve, reject) => {
            const resolvePromise = cb => {
                setTimeout(() => {
                    try {
                        const x = cb(this.PromiseResult)
                        if (x === thenPromise) {
                            // 不能返回⾃身哦
                            throw new Error('不能返回⾃身。。。')
                        }
                        if (x instanceof MyPromise) {
                            // 如果返回值是Promise
                            // 如果返回值是promise对象，返回值为成功，新promise就是成功
                            // 如果返回值是promise对象，返回值为失败，新promise就是失败
                            // 谁知道返回的promise是失败成功？只有then知道
                            x.then(resolve, reject)
                        } else {
                            // ⾮Promise就直接成功
                            resolve(x)
                        }
                    } catch (err) {
                        // 处理报错
                        reject(err)
                        throw new Error(err)
                    }
                })


            }
            if (this.PromiseState === 'fulfilled') {
                // 如果当前为成功状态，执⾏第⼀个回调
                resolvePromise(onFulfilled)
            } else if (this.PromiseState === 'rejected') {
                // 如果当前为失败状态，执⾏第⼆个回调
                resolvePromise(onRejected)
            } else if (this.PromiseState === 'pending') {
                // 如果状态为待定状态，暂时保存两个回调
                // 如果状态为待定状态，暂时保存两个回调
                this.onFulfilledCallbacks.push(resolvePromise.bind(this, onFulfilled))
                this.onRejectedCallbacks.push(resolvePromise.bind(this, onRejected))
            }
        })
        // 返回这个包装的Promise
        return thenPromise
    }

    static all(promise) {
        const result = []
        let count = 0
        return new MyPromise((resolve, reject) => {
            const addData = (index, value) => {
                result[index] = value
                count++
                if (count === promise.length) resolve(result)
            }

            promise.forEach((promise, index) => {
                if (promise instanceof MyPromise) {
                    promise.then(res => {
                        addData(index, res)
                    }, err => reject(err))
                } else {
                    addData(index, promise)
                }
            });
        })
    }

    static race(promises) {
        return new MyPromise((resolve, reject) => {
            promises.forEach(item => {
                if (item instanceof MyPromise) {
                    item.then(res => {
                        resolve(res)
                    }, err => {
                        reject(err)
                    })
                } else {
                    resolve(item)
                }
            })
        })
    }

    static allSettled(promises) {
        return new MyPromise((resolve, reject) => {
            const result = []
            let count = 0
            const addData = (status, value, index) => {
                result[index] = {
                    status,
                    value
                }
                count++
                if (count === promises.length) resolve(result)
            }

            promises.forEach((item, index) => {
                if (promises instanceof MyPromise) {
                    item.then(res => {
                        addData('fulfilled', res, index)
                    }, err => {
                        addData('rejected', err, index)
                    })
                } else {
                    addData('fulfilled', item, index)
                }
            })
        })
    }

    static any(promises) {
        let count = 0
        return new MyPromise((resolve, reject) => {
            promises.forEach(item => {
                if (item instanceof MyPromise) {
                    item.then(res => {
                        resolve(res)
                    }, err => {
                        count++
                        if (count === promises.length) reject('error')
                    })
                }
                else {
                    resolve(item)
                }
            })
        })
    }
}

const p1 = new MyPromise((resolve) => { resolve(111) })
const p2 = new MyPromise((resolve) => { resolve(222) })
const p3 = new MyPromise((resolve) => { resolve(333) })
const arr = [p1, p2, p3]
console.log(MyPromise.all(arr));



// const test3 = new MyPromise((resolve, reject) => {
//     resolve(100) // 输出 状态：success 值： 200
// }).then(res => 2 * res, err => 3 * err)
//     .then(res => console.log('success', res), err => console.log('fail', err))


// const test4 = new MyPromise((resolve, reject) => {
//     resolve(100) // 输出 状态：fail 值：200
// }).then(res => new MyPromise((resolve, reject) => reject(2 * res)), err => new Promise((resolve, reject) => resolve(3 * err)))
//     .then(res => console.log('success', res), err => console.log('fail', err))