const fs = require('fs')
const path = require('path')

/**
// 可读流
const res = fs.createReadStream(path.resolve(__dirname, './a.js'), {
    flags: 'r',
    start: 0,
    end: 1000,
    // highWaterMark: 20,
    autoClose: true,
    emitClose: true
})

let arr = []

res.on('open', data => {
    console.log('open', data);
})

res.on('data', data => {
    arr.push(data)
    console.log('data', data);
})

res.on('end', data => {
    console.log('end', Buffer.concat(arr).toString());
})
 */


// 压缩
const zlib = require('zlib')

const res = fs.createReadStream(path.resolve(__dirname, './a.js'))
    .pipe(zlib.createGzip())
    .pipe(fs.createWriteStream(path.resolve(__dirname, './a.js.gz')))