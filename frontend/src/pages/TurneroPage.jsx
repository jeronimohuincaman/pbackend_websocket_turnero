/* eslint-disable no-unused-vars */
import io from 'socket.io-client';
import MainContainerComponent from "../shared/components/MainContainer";

// Inicia la comunicación con el backend mediante Socket.IO
const socket = io('/');


function TurneroPage() {
    const turnos = [];
    const letras = ['A', 'B', 'C', 'D'];
    const puestos = 10;

    letras.forEach(letra => {
        for (let numero = 1; numero <= 10; numero++) {
            const puesto = (turnos.lenght % puestos) + 1;
            turnos.push({ codigo: `${letra}${numero}`, puesto: puesto })
        }
    });

    return (
        <>
            <MainContainerComponent>

            </MainContainerComponent>
        </>
    );
}

export default TurneroPage;