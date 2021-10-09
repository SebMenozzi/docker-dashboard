import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Material UI
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { red, green } from '@mui/material/colors';

// Icons
import StopIcon from '@mui/icons-material/Stop';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';

// Components
import GreenButton from './buttons/GreenButton';
import RedButton from './buttons/RedButton';

// API
import nodeApi from '../api/nodeApi';

const ContainerComponent = (props) => {
    const [isActive, setIsActive] = useState(props.isActive);

    useEffect(() => {
        setIsActive(props.isActive);
    }, [props.isActive]);

    const stopContainer = (e) => {
        e.preventDefault();

        const api = nodeApi();

        api.post('/stop_container', { id: props.id }).then((result) => {
            if (result.data.success) {
                setIsActive(false);
            }
        });
    };

    const startContainer = (e) => {
        e.preventDefault();

        const api = nodeApi();

        api.post('/start_container', { id: props.id }).then((result) => {
            if (result.data.success) {
                setIsActive(true);
            }
        });
    };

    const deleteContainer = (e) => {
        e.preventDefault();

        const api = nodeApi();

        api.post('/delete_container', { id: props.id }).then((result) => {
            if (result.data.success) {
                setIsActive(false);
            }
        });
    };

    const statusColor = isActive ? green[500] : red[500];

    const containerStyle = {
        flex: 1,
        mt: 2
    };

    return (
        <Paper
            sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column'
            }}
        >
            <Typography
                component="h2"
                variant="h6"
                color="secondary"
                sx={containerStyle}
            >
                {props.name}
            </Typography>
            <Typography color="#fff" sx={containerStyle}>
                <Box display="inline" fontWeight="fontWeightBold">
                    ID :
                </Box>{' '}
                {props.id}
            </Typography>
            <Typography color="#fff" sx={containerStyle}>
                <Box display="inline" fontWeight="fontWeightBold">
                    Image :
                </Box>{' '}
                {props.image}
            </Typography>
            <Typography color="#fff" sx={containerStyle}>
                <Box display="inline" fontWeight="fontWeightBold">
                    Port :
                </Box>{' '}
                {props.port}
            </Typography>
            <Typography color={statusColor} sx={containerStyle}>
                <Box display="inline" fontWeight="fontWeightBold">
                    Status :
                </Box>{' '}
                {props.status}
            </Typography>

            <Button
                color="primary"
                variant="contained"
                sx={containerStyle}
                startIcon={<VisibilityIcon />}
                disableElevation
                component={Link}
                to={'/logs/' + props.name}
            >
                View Logs
            </Button>

            {isActive && (
                <RedButton
                    variant="contained"
                    sx={containerStyle}
                    onClick={stopContainer}
                    startIcon={<StopIcon />}
                    disableElevation
                >
                    Stop
                </RedButton>
            )}
            {!isActive && (
                <GreenButton
                    variant="contained"
                    sx={containerStyle}
                    onClick={startContainer}
                    startIcon={<PlayArrowIcon />}
                    disableElevation
                >
                    Start
                </GreenButton>
            )}

            <Button
                color="secondary"
                sx={containerStyle}
                onClick={deleteContainer}
                startIcon={<DeleteIcon />}
                disableElevation
            >
                Delete
            </Button>
        </Paper>
    );
};

export default ContainerComponent;
