import React from 'react'
import Button from '@mui/material/Button'
import { green } from '@mui/material/colors'

const GreenButton = ({ children, ...props }) => (
    <Button {...props} sx={{
        ...props.sx,
        background: green[500],
        color: 'white',
        '&:hover': {
            background: green[500],
            opacity: 0.8
        },
        '&:active': {
            background: green[500],
            opacity: 1.0
        }
    }}>
        {children}
    </Button>
)

export default GreenButton
