import express from "express";
import http from "http";
import { Server as SocketServer } from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new SocketServer(server, {
    cors: {
        origin: 'http://localhost:5173',
    }
});

io.on('connection', socket => {
    console.log('Nuevo cliente conectado');

    socket.on('chat-message', (data) => {
        socket.broadcast.emit('chat-message', {
            data,
            from: socket.id.slice(6)
        });
        console.log(data);
    });
});

server.listen(3000);
console.log('Servidor escuchando en http://localhost:3000');