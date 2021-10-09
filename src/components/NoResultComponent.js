import React from 'react'

// Material UI
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'

const NoResultComponent = (props) => {
    return (
        <Grid item xs={12}>
            <Paper sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column'
            }}>
                {
                    props.isLoading &&
                    <CircularProgress color="secondary" size={60} sx={{
                        margin: 'auto',
                        padding: '10px'
                    }} />
                }
                {
                    !props.isLoading &&
                    <Typography component="h2" variant="h6" color="white" sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '10px'
                    }}>
                        {props.message}
                    </Typography>
                }
            </Paper>
        </Grid>
    )
}

export default NoResultComponent
