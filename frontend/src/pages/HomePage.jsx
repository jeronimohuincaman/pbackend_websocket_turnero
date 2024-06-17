import { Typography } from "@mui/material";
import HeaderComponent from "../shared/components/HeaderComponent";
import MainContainerComponent from '../shared/components/MainContainer';
import FooterComponent from "../shared/components/FooterComponent";

function HomePage() {
    return (
        <>
            <HeaderComponent />
            <MainContainerComponent>
                <Typography variant="h2" sx={{ textAlign: "center" }}>
                    Bienvenidos a mi portfolio
                </Typography>
                <Typography variant="body1" sx={{ my: 2, textAlign: "initial" }}>
                    Esta será un documentacion sobre mi experiencia en el mundo IT, mas concretamente demostrando mis conocimientos en area de programacion y desarrollo de software. Adelante!
                </Typography>

                <Typography variant="h3" sx={{ textAlign: "center" }}>
                    Habilidades
                </Typography>
            </MainContainerComponent>
            <FooterComponent />
        </>
    );
}

export default HomePage;