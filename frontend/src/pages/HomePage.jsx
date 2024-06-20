/* eslint-disable react/no-unescaped-entities */
import { Typography } from "@mui/material";
import MainContainerComponent from '../shared/components/MainContainer';

function HomePage() {
    return (
        <>
            <MainContainerComponent>
                <Typography variant="h2" sx={{ textAlign: "center" }}>
                    Bienvenidos
                </Typography>
                <Typography variant="h5" sx={{ my: 2, textAlign: "initial" }}>
                    En esta pequeña pagina se encontraran todas las respuestas y ejercicios resueltos sobre el trabajo practico obligatorio en la materia Integracion de aplicaciones. Tienen en la parte superior un pequeño menu que los ayudara a navegar entre las diferentes pestañas. Cualquier duda sobre la implementacion puedes visitar el documento "README".
                </Typography>
            </MainContainerComponent>
        </>
    );
}

export default HomePage;