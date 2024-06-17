/* eslint-disable react/prop-types */
import { List, ListItem, Paper, Typography } from '@mui/material';

const MessageList = ({ mensajes }) => {
    return (
        <List>
            {mensajes.map((msj, i) => (
                <ListItem key={i} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', mb: 1 }}>
                    <Paper elevation={1} sx={{ p: 2, width: '100%' }}>
                        <Typography variant="body2" color="textSecondary">{msj.from}</Typography>
                        <Typography variant="body1">{msj.data}</Typography>
                    </Paper>
                </ListItem>
            ))}
        </List>
    );
};

export default MessageList;
