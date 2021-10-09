import React from 'react'

// Material UI
import Button from '@mui/material/Button'
import { red } from '@mui/material/colors'

const RedButton = ({ children, ...props }) => (
    <Button {...props} sx={{
        ...props.sx,
        background: red[500],
        color: 'white',
        '&:hover': {
            background: red[500],
            opacity: 0.8
        },
        '&:active': {
            background: red[500],
            opacity: 1.0
        }
    }}>
        {children}
    </Button>
)

export default RedButton
