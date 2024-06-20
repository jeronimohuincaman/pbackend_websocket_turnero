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

//Generar turnos
const turnos = [
    { codigo: 'A-00', puesto: 1 },
    { codigo: 'A-01', puesto: 2 },
    { codigo: 'A-02', puesto: 3 },
    { codigo: 'A-03', puesto: 4 },
    { codigo: 'A-04', puesto: 5 },
    { codigo: 'A-05', puesto: 6 },
    { codigo: 'A-06', puesto: 7 },
    { codigo: 'A-07', puesto: 8 },
    { codigo: 'A-08', puesto: 9 },
    { codigo: 'A-09', puesto: 10 },
    { codigo: 'A-10', puesto: 1 },
    { codigo: 'B-00', puesto: 2 },
    { codigo: 'B-01', puesto: 3 },
    { codigo: 'B-02', puesto: 4 },
    { codigo: 'B-03', puesto: 5 },
    { codigo: 'B-04', puesto: 6 },
    { codigo: 'B-05', puesto: 7 },
    { codigo: 'B-06', puesto: 8 },
    { codigo: 'B-07', puesto: 9 },
    { codigo: 'B-08', puesto: 10 },
    { codigo: 'B-09', puesto: 1 },
    { codigo: 'B-10', puesto: 2 }
];


io.on('connection', socket => {
    console.log('Nuevo cliente conectado');

    //Esta emicion es utilizada para que pueda circular el flujo de mensajes entre los diferentes clientes conectados
    socket.on('chat-message', (data) => {
        socket.broadcast.emit('chat-message', {
            data,
            from: socket.id.slice(6)
        });
    });

    socket.emit('turnos', turnos); //Esta linea permite cargar todos los turnos al momento que un nuevo cliente se conecta

    //Esta emicion es utilizada para que pueda circular el flujo de estados de los turnos entre los diferentes clientes conectados
    socket.on('nuevo-turno', (turno) => {
        io.emit('nuevo-turno', turno);
    });

});

server.listen(3000);
console.log('Servidor escuchando en http://localhost:3000');