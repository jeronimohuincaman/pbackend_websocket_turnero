import { Box, Container, Typography } from '@mui/material';

export const FooterComponent = () => {
    return (
        <Box
            component="footer"
            sx={{
                py: 3,
                px: 2,
                mt: 'auto',
                backgroundColor: (theme) =>
                    theme.palette.mode === 'light' ? theme.palette.grey[200] : theme.palette.grey[800], 
            }}
        >
            <Container maxWidth="lg">
                <Typography variant="body1" sx={{ textAlign: "center", fontStyle: "italic", color: "grey" }}>
                    Jeronimo Ezequiel Huincamán
                </Typography>
                <Typography variant="body2" color="text.secondary" align="center">
                    {'Copyright © '}
                    {new Date().getFullYear()}
                    {'.'}
                </Typography>
            </Container>
        </Box>
    );
};

export default FooterComponent;
