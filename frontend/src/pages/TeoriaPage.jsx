/* eslint-disable react/no-unescaped-entities */
import { Typography } from "@mui/material";
import MainContainerComponent from '../shared/components/MainContainer';

function TeoriaPage() {
    return (
        <>
            <MainContainerComponent>
                <Typography variant="h3" align="center" gutterBottom>
                    Explique con sus palabras que son las aplicaciones en tiempo real.
                </Typography>
                <Typography variant="body1" align="justify" gutterBottom>
                    Las aplicaciones en tiempo real son sistemas los cuales permiten obtener informacion de manera casi instantanea generando una conexion bidireccional directamente entre un emisor y un receptor. Un ejemplo podria ser un panel de mensajeria o un turnero de banco. Otro ejemplo podria ser una conversacion telefonica, la cual su comunicacion no se ve interrumpida en ningun momento.
                </Typography>
                <Typography variant="h3" align="center" gutterBottom>
                    Explique que son los webSockets
                </Typography>
                <Typography variant="body1" align="justify" gutterBottom>
                    Los websockets son una herramienta tecnologica que permite establecer una conexion bidereccional entre un emisor y un receptor. Esto permite que ambas partes intercambien informacion en cualquier momento sin que se deba finalizar y volver a comenzar.
                </Typography>
            </MainContainerComponent>
        </>
    );
}

export default TeoriaPage;