/* eslint-disable react/prop-types */
import { Box, Container } from "@mui/material";
import HeaderComponent from "./HeaderComponent";
import FooterComponent from "./FooterComponent";

export const MainContainerComponent = ({ children }) => {
    return (
        <>
            <HeaderComponent />
            <Container maxWidth="lg">
                <Box sx={{ my: 4 }}>
                    {children}
                </Box>
            </Container>
            <FooterComponent />
        </>
    )
}

export default MainContainerComponent;
