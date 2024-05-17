// 实现⼀个带并发限制的异步调度器 Scheduler，保证同时运⾏的任务最多有N个。完善下⾯代码中的
// Scheduler 类，使得以下程序能正确输出：

/**
class Scheduler {
    add(promiseCreator) { ... }
    // ...
}
const timeout = (time) => new Promise(resolve => {
    setTimeout(resolve, time)
})
const scheduler = new Scheduler(n)
const addTask = (time, order) => {
    scheduler.add(() => timeout(time)).then(() => console.log(order))
}
addTask(1000, '1')
addTask(500, '2')
addTask(300, '3')
addTask(400, '4')
// 打印顺序是：2 3 1 4
 */


class Scheduler {
    constructor(max) {
        this.max = max
        this.count = 0
        this.queue = new Array()
    }

    async add(promiseCreator) {
        if (this.count >= this.max) {
            await new Promise((resolve) => this.queue.push(resolve))
        }

        this.count++
        const res = await promiseCreator()
        this.count--
        if (this.queue.length) this.queue.shift()()
        return res
    }
}

const timeout = time => new Promise(resolve => {
    setTimeout(resolve, time)
})

const scheduler = new Scheduler(2)
const addTask = (time, order) => {
    scheduler.add(() => timeout(time)).then(res => console.log(order))
}
addTask(1000, '1')
addTask(500, '2')
addTask(300, '3')
addTask(400, '4')