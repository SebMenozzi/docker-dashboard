import React from 'react'

// Material UI
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'

const CopyrightComponent = (props) => {
    return (
        <Box pt={4}>
            <Typography variant="body2" color="text.secondary" align="center" {...props}>
                {'Copyright © '}
                <Link color="inherit" href="#">
                    Sebastien Menozzi
                </Link>{' '}
                {new Date().getFullYear()}
            </Typography>
        </Box>
    );
}

export default CopyrightComponent
