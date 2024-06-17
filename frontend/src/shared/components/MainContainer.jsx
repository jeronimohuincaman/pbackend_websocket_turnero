/* eslint-disable react/prop-types */
import { Box, Container } from "@mui/material";

export const MainContainerComponent = ({ children }) => {
    return (
        <Container maxWidth="lg">
            <Box sx={{ my: 4 }}>
                {children}
            </Box>
        </Container>
    )
}

export default MainContainerComponent;
