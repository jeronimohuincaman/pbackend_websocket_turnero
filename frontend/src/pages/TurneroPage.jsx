/* eslint-disable no-unused-vars */
import io from 'socket.io-client';
import MainContainerComponent from "../shared/components/MainContainer";
import { useEffect, useState } from 'react';
import { Box, Button, Container, List, ListItem, ListItemText, Paper, Typography } from '@mui/material';

// Inicia la comunicación con el backend mediante Socket.IO
const socket = io('/');


function TurneroPage() {
    const [turnos, setTurnos] = useState([]); // Almacenamos los turnos 'hardcodeados' al inciar una conexion
    const [historialTurnos, setHistorialTurnos] = useState([]); // Almacena los turnos que fueron atendidos
    const [turnoActual, setTurnoActual] = useState(null); // Se almacena el turno actual
    const [audioLoaded, setAudioLoaded] = useState(false); // Nuevo estado para controlar si el audio está cargado

    /** Uso este hook para controlar los efectos secundarios de cada una de las funcionalidades */
    useEffect(() => {
        // Cuando iniciamos una conexion se setean los turnos
        socket.on('turnos', (turnos) => {
            setTurnos(turnos);
        });

        // Esta emision comienza cuando 'Llamo' a un nuevo turno
        socket.on('nuevo-turno', (turno) => {
            setTurnos(prevTurnos => prevTurnos.filter(t => t.codigo !== turno.codigo)); // Actualizo el array de turnos quitando el 'turno' que acabamos de llamar 
            setTurnoActual(turno); // Seteo el turno al que llamamos como 'Turno actual' para que se actualice en varios 'clientes'
            setHistorialTurnos((prev) => [turno, ...prev]); // Añado el turno actual al historial de turnos llamados
        });

        // Cargar el audio
        const audio = new Audio('/turno-llamado.mp3'); // Ruta del archivo de sonido
        audio.load(); // Cargar el audio
        audio.addEventListener('loadeddata', () => {
            setAudioLoaded(true); // Marcar el audio como cargado cuando esté listo
        });

        return () => {
            // finalizo la emision hasta la proxima que se necesite
            socket.off('turnos');
            socket.off('nuevo-turno');
        };
    }, []);

    /** Esta función es la encargada de manipular los datos cuando apretamos el boton 'llamar' */
    const handleLlamarTurno = (turno) => {
        setTurnoActual(turno); // Establezo el 'turno actual'
        setTurnos(prevTurnos => prevTurnos.filter(t => t.codigo !== turno.codigo)); //Actualizo los turnos pendientes quitando el turno seleccionado.
        socket.emit('nuevo-turno', turno); //Comienzo emision

        // Verificar si el audio está cargado y reproducirlo. Se hace esto para solucionar problemas de Promises
        if (audioLoaded) {
            const audio = new Audio('/turno-llamado.mp3');
            audio.play().catch(error => {
                console.error('Error al reproducir audio:', error);
            });
        }
    };

    return (
        <>
            <MainContainerComponent>
                <Container maxWidth="lg" sx={{ display: 'flex', flexDirection: 'row' }}>
                    {/* Lateral izquierdo: Proximos turnos */}
                    <Box sx={{ width: '50%', p: 2 }}>
                        <Paper elevation={1} sx={{ flex: 1, padding: 2, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', backgroundColor: 'lightgrey' }}>
                            <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 2 }}>
                                Próximos Turnos
                            </Typography>
                            <List sx={{
                                bgcolor: 'background.paper',
                                position: 'relative',
                                overflow: 'auto',
                                maxHeight: 400,
                                backgroundColor: 'inherit'
                            }}>
                                {/* Recorro los turnos y creo un item con los datos de turnos */}
                                {turnos.map((turno, index) => (
                                    <ListItem key={index}>
                                        <Paper elevation={2} sx={{ width: "100%", display: 'flex', padding: 1 }}>
                                            <ListItemText primary={`Turno: ${turno.codigo}`} />
                                            <Button variant="contained" color="primary" onClick={() => handleLlamarTurno(turno)}>
                                                Llamar
                                            </Button>
                                        </Paper>
                                    </ListItem>
                                ))}
                            </List>
                        </Paper>
                    </Box>

                    {/* Panel de Turno actual */}
                    <Box sx={{ width: '70%', p: 2 }}>
                        <Paper elevation={2} sx={{ flex: 1, padding: 2, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', backgroundColor: 'green', color: 'white' }}>
                            <Typography variant="h4" component="h1" align="center" gutterBottom sx={{ textAlign: 'center' }}>
                                Turno Actual
                            </Typography>
                            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                {turnoActual ? (
                                    <>
                                        <Typography variant="h2" component="p">
                                            {turnoActual.codigo}
                                        </Typography>
                                        <Typography variant="h5" component="p">
                                            Puesto: {turnoActual.puesto}
                                        </Typography>
                                    </>
                                ) : (
                                    <Typography variant="h6" component="p">
                                        No hay turnos en espera
                                    </Typography>
                                )}
                            </Box>
                        </Paper>
                    </Box>

                    {/* Lateral derecho: Historial de turnos */}
                    <Box sx={{ width: '50%', p: 2 }}>
                        <Paper elevation={1} sx={{ flex: 1, padding: 2, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', backgroundColor: 'lightgrey' }}>
                            <Typography variant="h5" component="h2" gutterBottom sx={{ textAlign: 'center' }}>
                                Historial de Turnos
                            </Typography>
                            <List sx={{
                                bgcolor: 'background.paper',
                                position: 'relative',
                                overflow: 'auto',
                                maxHeight: 150,
                                backgroundColor: 'inherit',
                            }}>
                                {/* Recorro los turnos y creo un item con los datos de turnos */}
                                {historialTurnos.map((turno, index) => (
                                    <ListItem key={index}>
                                        <Paper elevation={2} sx={{
                                            width: "100%",
                                            display: 'flex',
                                            padding: 1,
                                            backgroundColor: index === 0 ? 'lightskyblue' : 'lightgreen'
                                        }}>
                                            <ListItemText primary={`Turno: ${turno.codigo} | Puesto: ${turno.puesto}`} />
                                        </Paper>
                                    </ListItem>
                                ))}
                            </List>
                        </Paper>
                    </Box>
                </Container>
            </MainContainerComponent>
        </>
    );
}

export default TurneroPage;