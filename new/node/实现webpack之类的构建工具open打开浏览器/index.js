const { exec } = require('child_process')
const os = require('os')

// 通过执行shell脚本打开浏览器
const open = url => {
    // macOS
    if (os.platform() === 'darwin') {
        exec(`open ${url}`)
    }
    // Windows
    else if (os.platform() === 'win32') {
        exec(`start ${url}`)
    }
    // Linux、Unix-like
    else {
        exec(`xdg-open ${url}`)
    }
}

open('https://baidu.com')