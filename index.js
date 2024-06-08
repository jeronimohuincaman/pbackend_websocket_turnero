const express = require('express');
const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io');

const app = express();
const server = createServer(app);
const io = new Server(server);

app.use(express.static('./public'))

app.get('/', (req, res) => {
    res.sendFile('index.html', { root: join(__dirname, 'public') });
    // res.send('<h1> Bienvenidos! </h1>');
});


io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
        // console.log('message: ' + msg);
    });
});

server.listen(3000, () => {
    console.log('Servidor corriendo...');
});
