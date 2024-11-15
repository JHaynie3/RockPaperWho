// This will send whatever you type in to whoever sends a request

const {createServer} = require('http');
const { Server } = require('socket.io');


const server = createServer()

server.on('request', (req , res) => {
    if (req.url === "/favicon.ico") {
        res.statusCode = 404;
        res.end()
    }

    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
});






server.listen(80);
















// interaction
const io = new Server(server, {
    cors: {
        origin: '*',
    }
});

const players = [];


// ON PLAYER CONNECTION
io.on('connection', (socket) => {

    socket.on('setup', (name) => {
        console.log(name);
        players.push({
            name: name,
            socket: socket,
        });
        io.emit('setup', players.map(p => {return {name: p.name}}))
    })

    socket.on('disconnect', () => {
        console.log('Lost connection to ' + socket.conn.remoteAddress);
    })

    console.log('New connection from ' + socket.conn.remoteAddress);
})

// when code is exited out, program ends, ctrl + c
process.on('exit', () => {
    io.close();
})

io.listen(8888);