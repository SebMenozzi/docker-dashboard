import React, { useState } from 'react'

// Material UI
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

const StatsComponent = (props) => {
    const style = {
        flex: 1,
        p: 1
    }

    return (
        <Paper sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column'
        }}>
            <Typography component="h2" variant="h6" color="secondary" sx={style}>
                {props.name}
            </Typography>
            <Typography component="p" variant="h5" color="#fff" sx={style}>
                <Box display="inline" fontWeight="fontWeightBold">CPU:</Box> {props.cpu}
            </Typography>
            <Typography color="#fff" sx={style}>
                <Box display="inline" fontWeight="fontWeightBold">Memory:</Box> {props.mem}
            </Typography>
        </Paper>
    )
}

export default StatsComponent
