function foo() {
    // foo() //会栈溢出
    // setTimeout(foo(), 0)  // 会栈溢出
    // setTimeout(foo, 0);   // 不会溢出，setTimeout会移至计时器线程处理，而不会霸占主线程
    Promise.resolve().then(foo)
}
foo()