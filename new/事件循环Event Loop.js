// let setTimeoutCallBack = function () {
//     console.log('');
// };
// let httpCallback = function () {
//     console.log('http');
// }
// // 
// console.log('1');
// // 
// setTimeout(setTimeoutCallBack, 1000);
// // http
// ajax.get('/info', httpCallback);
// // 
// console.log('2');









// document.body.style = 'background:blue'
// console.log(1);
// Promise.resolve().then(() => {
//     console.log(2);
//     document.body.style = 'background:pink'
// });
// console.log(3);









// new Promise((resolve) => {
//     console.log(1)
//     resolve()
// }).then(() => {
//     console.log(2)
// })
// console.log(3)
//    // 1 3 2





// setTimeout(() => console.log(4))
// async function test() {
//     console.log(1)
//     await Promise.resolve()
//     console.log(3)
// }
// test()
// console.log(2)
// // 1 2 3 4






function test() {
    console.log(1)
    setTimeout(function () { // timer1
        console.log(2)
    }, 1000)
}
test();
setTimeout(function () { // timer2
    console.log(3)
})
new Promise(function (resolve) {
    console.log(4)
    setTimeout(function () { // timer3
        console.log(5)
    }, 100)
    resolve()
}).then(function () {
    setTimeout(function () { // timer4
        console.log(6)
    }, 0)
    console.log(7)
})
console.log(8)
   // 14873652