// call（不用bind、apply）
Function.prototype.myCall = function (ctx, ...args) {
    // this    其实就是调用myCall时那个函数，例子：fn.myCall   this指向fn
    ctx = (ctx === null || ctx === undefined) ? globalThis : Object(ctx);
    // 我们需要执行this指向的那个函数，可是我们不能直接执行，不然就像直接调用fn()了
    // 所以我们放到ctx的属性里,比如ctx.fn=this; ctx.fn()
    // 唯一key，防止传递的ctx对象里也传入同名的属性  比如：传入的ctx实参：{fn:2},这样的话像上一条注释那样，就会把传入的实参的fn给覆盖掉了
    const key = Symbol('temp');
    Object.defineProperty(ctx, key, {
        enumerable: false,
        value: this
    });
    // 如果有return
    const result = ctx[key](...args);
    delete ctx[key]
    return result
}
console.log(fn.myCall({}, 1, 2));
// fn.call({},1,2);


function fn(a, b) {
    console.log(this, a, b);
    return a + b;
};

// 使用bind封装的call方法
Function.prototype.useBindNewCall = function (ctx, ...args) {
    const useBind = this.bind(ctx);
    useBind(...args);
};
fn.useBindNewCall({}, 1, 2);



// 使用apply封装的bind方法
Function.prototype.myBind = function (ctx) {
    let fn = this;
    // return function (...args) {
    return function () {
        return fn.apply(ctx, arguments);
        // return fn.call(ctx, ...args);
    }
};
const newBind = fn.myBind({});
newBind(1, 2);