import React, { useEffect, useState, useRef } from 'react';
import Convert from 'ansi-to-html';
import io from 'socket.io-client';

// Material UI
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

// Components
import NoResultComponent from '../components/NoResultComponent';
import CommandInputComponent from '../components/CommandInputComponent';

// API
import nodeApi from '../api/nodeApi';

const convert = new Convert();

const LogsRoute = (props) => {
    const [socket, setSocket] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [logs, setLogs] = useState([]);
    const logsContainer = useRef(null);

    useEffect(() => {
        props.setTitle('Logs');
        setSocket(io.connect('http://localhost:9090'));
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 3000);
        return () => clearTimeout(timer);
    }, []);

    const scrollToBottom = () => {
        const scrollHeight = logsContainer.current.scrollHeight;
        const height = logsContainer.current.clientHeight;
        const maxScrollTop = scrollHeight - height;
        logsContainer.current.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
    };

    useEffect(() => {
        if (!socket) return;

        // ask for data
        socket.emit('containers.logs', props.match.params.name);

        // listen
        socket.on('containers.logs', (result) => {
            setIsLoading(false);

            setLogs((prevLogs) => [...prevLogs, result]);

            scrollToBottom();
        });

        return () => {
            socket.off('containers.logs');
            // Kill the process
            socket.emit('containers.logs.bye');
            // Disconnect the socket
            socket.disconnect();
        };
    }, [socket]);

    return (
        <div>
            {!isLoading && logs.length > 0 && (
                <Paper
                    ref={(el) => (logsContainer.current = el)}
                    sx={{
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        overflow: 'auto',
                        backgroundColor: '#111',
                        overflow: 'auto',
                        height: '80vh'
                    }}
                >
                    <Typography
                        component="h6"
                        color="white"
                        sx={{ padding: '10px' }}
                    >
                        {logs.map((log) => {
                            return log.split('\n').map((item, i) => {
                                return (
                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html: convert.toHtml(item)
                                        }}
                                    ></div>
                                );
                            });
                        })}
                    </Typography>
                    <CommandInputComponent />
                </Paper>
            )}
            {(isLoading || logs.length == 0) && (
                <NoResultComponent
                    message={'No logs to show'}
                    isLoading={isLoading}
                />
            )}
        </div>
    );
};

export default LogsRoute;
