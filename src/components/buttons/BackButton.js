import React from 'react';
import { withRouter } from 'react-router-dom';

// Material UI
import IconButton from '@mui/material/IconButton';

const BackButton = ({ history: { goBack }, children, ...props }) => (
    <IconButton {...props} onClick={goBack}>
        {children}
    </IconButton>
);

export default withRouter(BackButton);
