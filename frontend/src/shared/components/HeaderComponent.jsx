import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export const HeaderComponent = () => {
    return (
        <AppBar position="static" sx={{backgroundColor: "darkslategray"}}>
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Mi portfolio
                </Typography>
                <Button color="inherit" component={Link} to="/">
                    Inicio
                </Button>
                <Button color="inherit" component={Link} to="/chat">
                    Chat
                </Button>
            </Toolbar>
        </AppBar>
    )
};

export default HeaderComponent;