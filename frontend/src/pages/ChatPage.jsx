/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import MainContainerComponent from '../shared/components/MainContainer';
import { Box, Button, Paper, TextField } from '@mui/material';
import MessageList from '../shared/components/MensajesLista';

// Inicia la comunicación con el backend mediante Socket.IO
const socket = io('/');

function ChatPage() {
    // Estado para manejar el valor del campo de entrada del mensaje
    const [mensaje, setMensaje] = useState('');
    // Estado para almacenar y administrar todos los mensajes del chat
    const [mensajes, setMensajes] = useState([]);

    // Referencia para controlar el desplazamiento automático al final de la lista de mensajes
    const messageEndRef = useRef(null);

    // Maneja el envío de un nuevo mensaje
    const handleSubmit = (e) => {
        e.preventDefault(); // Previene el comportamiento predeterminado del formulario

        const nuevoMensaje = {
            data: mensaje,
            from: 'Yo'
        };

        // Actualiza la lista de mensajes con el nuevo mensaje
        setMensajes([...mensajes, nuevoMensaje]);
        // Envía el mensaje al servidor mediante Socket.IO
        socket.emit('chat-message', mensaje);
        // Limpia el campo de entrada después de enviar el mensaje
        setMensaje('');
    };

    useEffect(() => {
        // Escucha los mensajes entrantes del servidor
        socket.on('chat-message', mensajeRecibido);

        // Limpia el oyente del mensaje cuando el componente se desmonta
        return () => {
            socket.off('chat-message', mensajeRecibido);
        };
    }, []);

    /**
     * Actualiza la lista de mensajes con los mensajes recibidos del servidor
     * @param {*} mensaje - El mensaje recibido del servidor
     */
    const mensajeRecibido = (mensaje) => setMensajes((state) => [...state, mensaje]);

    // Desplaza automáticamente al final de la lista de mensajes cuando hay nuevos mensajes
    useEffect(() => {
        messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [mensajes]);

    return (
        <>
            <MainContainerComponent>
                <Paper elevation={3} sx={{ flex: 1, padding: 2, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <Box sx={{ flex: 1, overflowY: 'auto', maxHeight: '60vh' }}>
                        <MessageList mensajes={mensajes} />
                        <div ref={messageEndRef} />
                    </Box>
                    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', mt: 2 }}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            placeholder="Escribe algo..."
                            value={mensaje}
                            onChange={(e) => setMensaje(e.target.value)}
                        />
                        <Button type="submit" variant="contained" color="primary" sx={{ marginLeft: 2 }}>
                            Enviar
                        </Button>
                    </Box>
                </Paper>
            </MainContainerComponent>
        </>
    );
}

export default ChatPage;
