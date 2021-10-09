import React from 'react';
import { Link } from 'react-router-dom';

// Material UI
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

// Icons
import DashboardIcon from '@mui/icons-material/Dashboard';
import BarChartIcon from '@mui/icons-material/BarChart';

const LocalListItems = () => {
    return (
        <div>
            <ListItem button component={Link} to="/containers">
                <ListItemIcon>
                    <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Containers" />
            </ListItem>
            <ListItem button component={Link} to="/stats">
                <ListItemIcon>
                    <BarChartIcon />
                </ListItemIcon>
                <ListItemText primary="Stats" />
            </ListItem>
        </div>
    );
};

export default LocalListItems;
