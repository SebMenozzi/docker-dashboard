import React, { useState } from 'react';

// Material UI
import TextField from '@mui/material/TextField';

// API
import nodeApi from '../api/nodeApi';

const CommandInputComponent = (props) => {
    const [command, setCommand] = useState('');

    const sendCommand = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();

            const api = nodeApi();

            api.post('/send_command', { id: props.id, command: command }).then(
                (result) => {
                    if (result.data.success) {
                        setCommand('');
                    }
                }
            );
        }
    };

    const handleCommand = (e) => {
        e.preventDefault();

        setCommand(e.target.value);
    };

    return (
        <TextField
            autoFocus
            label="Type your command..."
            variant="outlined"
            color="secondary"
            fullWidth
            onKeyPress={sendCommand}
            onChange={handleCommand}
        />
    );
};

export default CommandInputComponent;
