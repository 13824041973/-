function fn1() {
    let test = new Array(1000).fill('xianzao')
    return function () {
        console.log('zaoxian')
    }
}
let fn1Child = fn1()
fn1Child()




function fn2() {
    let test = new Array(1000).fill('xianzao')
    return function () {
        console.log(test)
        return test
    }
}
let fn2Child = fn2()
fn2Child()