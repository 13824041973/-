/**
 * utf8编码中 中文(包括中文符号)占3个字节，英文(包括英文符号)占1个字节
 const bufText = Buffer.from(':,.。；')
 const buf1 = Buffer.alloc(10)
 
 bufText.copy(buf1, 0, 0)
 
 console.log(buf1);
 */


const fs = require('fs')
const path = require('path')

fs.readFile(path.resolve(__dirname, './a.js'), 'utf-8', (err, data) => {
    fs.writeFile(path.resolve(__dirname, './a-copy.js'), data, err => {

    })
})

let buf = Buffer.alloc(30);

fs.open(path.resolve(__dirname, './a.js'), 'r', (err, rfd) => {
    fs.read(rfd, buf, 0, 30, 0, (err, bytesRead) => {
        console.log(buf.toString());

        fs.open(path.resolve(__dirname, './b.js'), 'w', 0o666, (err, wfd) => {
            fs.write(wfd, buf, 0, 30, 0, (err, written) => {
                console.log('success', written, err);
                fs.close(wfd)
            })
        })
    })
})