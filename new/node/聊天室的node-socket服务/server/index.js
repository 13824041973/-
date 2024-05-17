// import path from 'path'
// import { createServer } from 'http'
// import { Server } from 'socket.io'

const { createServer } = require('http')
const { Server } = require('socket.io')

const httpServer = createServer()

var io = new Server(httpServer, {
    path: '/websocket',
    cors: {
        origin: ['http://localhost:3000'],
        allowedHeaders: ['y-hearder'],
        credentials: true
    }
})

let clients = 0

io.on('connection', function (socket) {
    clients++

    socket.on('chat:start', (id, cb) => {
        console.log(`chat:start::${id}上线成功`);
        io.sockets.emit('chat:add', {
            [id]: `用户${id}已经上线`
        })
        cb()
    })

    socket.on('chat:msg', (id, msg) => {
        console.log(`${id}说：${msg}`);
        io.sockets.emit('chat:msg', {
            id,
            type: 'msg',
            msg: `${msg}`
        })
    })
})

httpServer.listen(808, () => {
    console.log('server running in 808');
})