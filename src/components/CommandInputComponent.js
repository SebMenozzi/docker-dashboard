import React from 'react';

// Material UI
import TextField from '@mui/material/TextField';

const CommandInputComponent = (props) => {
    return (
        <TextField
            label="Type your command..."
            variant="outlined"
            color="secondary"
            fullWidth
        />
    );
};

export default CommandInputComponent;
