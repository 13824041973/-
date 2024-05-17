async function doSomething(i) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Math.random() > 0.5) {
                // reject('fuck')
                throw new Error(i)
            }
            else {
                resolve(i)
            }
        }, 1000);
    })

}

async function process(array) {
    try {
        for await (let i of array) {
            console.log(await doSomething(i));
        }
        console.log(1548);
    } catch (error) {
        console.log(error);
    }

}

process([1, 2, 3])

// 1
// 2
// 3
// 1548