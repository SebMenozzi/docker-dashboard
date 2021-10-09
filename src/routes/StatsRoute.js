import React, { useEffect, useState, useRef } from 'react';

// Material UI
import Grid from '@mui/material/Grid';

// Components
import StatsComponent from '../components/StatsComponent';
import NoResultComponent from '../components/NoResultComponent';

// socket.io
import io from 'socket.io-client';

const StatsRoute = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const [socket, setSocket] = useState(null);
    const [stats, setStats] = useState([]);

    useEffect(() => {
        props.setTitle('Stats');

        // Create the socket
        setSocket(io.connect('http://localhost:9090'));
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 3000);
        return () => clearTimeout(timer);
    }, []);

    const setStatsSorted = (result) => {
        // By name in alphabetic order
        result.sort((a, b) => a.name.localeCompare(b.name));
        setStats(result);
    };

    useEffect(() => {
        if (!socket) return;

        // Start asking their ressources data
        socket.emit('containers.stats');

        // Listen to news ressources data
        socket.on('containers.stats', (result) => {
            setIsLoading(false);
            setStatsSorted(result);
        });

        return () => {
            // Kill the process
            socket.emit('containers.stats.bye');
            // Disconnect the socket
            socket.disconnect();
        };
    }, [socket]);

    return (
        <Grid container spacing={3}>
            {!isLoading &&
                stats.length > 0 &&
                stats.map((stat) => {
                    return (
                        <Grid item xs={12} md={4} lg={3}>
                            <StatsComponent
                                name={stat.name}
                                cpu={stat.cpu}
                                mem={stat.mem}
                            />
                        </Grid>
                    );
                })}
            {(isLoading || stats.length == 0) && (
                <NoResultComponent
                    message={'No Container'}
                    isLoading={isLoading}
                />
            )}
        </Grid>
    );
};

export default StatsRoute;
