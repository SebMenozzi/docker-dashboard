import React, { useEffect, useState } from 'react';

// Material UI
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
// Icons
import StopIcon from '@mui/icons-material/Stop';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

// Components
import useInterval from '../components/useInterval';

import ContainerComponent from '../components/ContainerComponent';
import GreenButton from '../components/buttons/GreenButton';
import RedButton from '../components/buttons/RedButton';
import NoResultComponent from '../components/NoResultComponent';

// API
import nodeApi from '../api/nodeApi';

const ContainersRoute = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const [containers, setContainers] = useState([]);

    const setContainersSorted = (result) => {
        // By name in alphabetic order
        result.sort((a, b) => a.name.localeCompare(b.name));
        setContainers(result);
    };

    const getContainers = () => {
        const api = nodeApi();

        api.get('/containers').then((result) => {
            setIsLoading(false);
            setContainersSorted(result.data.containers);
        });
    };

    const updateContainers = () => {
        const api = nodeApi();

        api.get('/containers').then((result) => {
            if (
                !isLoading ||
                (isLoading && result.data.containers.length > 0)
            ) {
                setIsLoading(false);
            }
            setContainersSorted(result.data.containers);
        });
    };

    const restartContainers = (e) => {
        e.preventDefault();

        setIsLoading(true);

        const api = nodeApi();
        api.post('/restart_containers');
    };

    const deleteContainers = (e) => {
        e.preventDefault();

        const api = nodeApi();
        api.post('/delete_containers');
    };

    const openDialog = (e) => {
        e.preventDefault();

        // Open the workers dialog
        setIsDialogOpen(true);
    };

    useEffect(() => {
        props.setTitle('Containers');

        // Fetch containers
        getContainers();
    }, []);

    // Polling containers
    useInterval(() => updateContainers(), 1000);

    return (
        <div>
            <Box sx={{ mb: 2 }}>
                <GreenButton
                    sx={{ mr: 2 }}
                    variant="contained"
                    onClick={restartContainers}
                    startIcon={<PlayArrowIcon />}
                    disableElevation={true}
                    disabled={isLoading}
                >
                    Restart Containers
                </GreenButton>
                <RedButton
                    variant="contained"
                    onClick={deleteContainers}
                    startIcon={<StopIcon />}
                    disableElevation={true}
                    disabled={isLoading}
                >
                    Delete Containers
                </RedButton>
            </Box>
            <Grid container spacing={3}>
                {!isLoading &&
                    containers.length > 0 &&
                    containers.map((container) => {
                        return (
                            <Grid item xs={12} md={4} lg={3}>
                                <ContainerComponent
                                    name={container.name}
                                    id={container.id}
                                    image={container.image}
                                    status={container.status}
                                    isActive={container.is_active}
                                    port={container.port}
                                />
                            </Grid>
                        );
                    })}
                {(isLoading || containers.length == 0) && (
                    <NoResultComponent
                        message={'No Containers'}
                        isLoading={isLoading}
                    />
                )}
            </Grid>
        </div>
    );
};

export default ContainersRoute;
