import React, { useState, useMemo } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

// Material UI
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

// Components
import DashboardAppBar from '../components/DashboardAppBar';
import DashboardDrawer from '../components/DashboardDrawer';
import CopyrightComponent from '../components/CopyrightComponent';

// Routes
import NoMatchRoute from './NoMatchRoute';
import ContainersRoute from './ContainersRoute';
import LogsRoute from './LogsRoute';
import StatsRoute from './StatsRoute';

const NavigationRoutes = () => {
    const [open, setOpen] = useState(true);
    const toggleDrawer = () => setOpen(!open);
    const [title, setTitle] = useState('');

    const mdTheme = createTheme({
        palette: {
            primary: {
                main: '#352384'
            },
            secondary: {
                main: '#EA0B8C'
            },
            mode: 'dark'
        }
    });

    return (
        <ThemeProvider theme={mdTheme}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />

                <DashboardAppBar
                    open={open}
                    toggleDrawer={toggleDrawer}
                    title={title}
                />
                <DashboardDrawer open={open} toggleDrawer={toggleDrawer} />

                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        height: '100vh',
                        overflow: 'auto'
                    }}
                >
                    <Toolbar />
                    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                        <Switch>
                            <Route
                                exact
                                path="/containers"
                                render={(props) => (
                                    <ContainersRoute
                                        setTitle={setTitle}
                                        {...props}
                                    />
                                )}
                            />
                            <Route
                                exact
                                path="/stats"
                                render={(props) => (
                                    <StatsRoute
                                        setTitle={setTitle}
                                        {...props}
                                    />
                                )}
                            />
                            <Route
                                exact
                                path="/logs/:name"
                                render={(props) => (
                                    <LogsRoute setTitle={setTitle} {...props} />
                                )}
                            />
                            <Route
                                exact
                                path="/"
                                render={() => <Redirect to="/containers" />}
                            />
                            <Route
                                render={(props) => (
                                    <NoMatchRoute
                                        setTitle={setTitle}
                                        {...props}
                                    />
                                )}
                            />
                        </Switch>
                        <CopyrightComponent />
                    </Container>
                </Box>
            </Box>
        </ThemeProvider>
    );
};

export default NavigationRoutes;
