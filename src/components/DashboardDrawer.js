import React from 'react'
import { withRouter } from 'react-router-dom'

// Material UI
import { styled } from '@mui/material/styles'
import MuiDrawer from '@mui/material/Drawer'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import List from '@mui/material/List'
import Toolbar from '@mui/material/Toolbar'

import MenuIcon from '@mui/icons-material/Menu';

// Components
import LocalListItems from './LocalListItems'

const drawerWidth = 240

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(!open && {
                    overflowX: 'hidden',
                    transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(9),
                },
            }),
        },
    }),
);

const DashboardDrawer = (props) => {
    return (
        <Drawer
            variant="permanent"
            open={props.open}>
            <Toolbar sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                px: [1],
            }}>
                <IconButton onClick={props.toggleDrawer}>
                    <MenuIcon />
                </IconButton>
            </Toolbar>
            <Divider />
            <List>
                <LocalListItems />
            </List>
        </Drawer>
    )
}

export default withRouter(DashboardDrawer)
