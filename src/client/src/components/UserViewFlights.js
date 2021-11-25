import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
    Grid,
    Card,
    CardContent,
    Typography,
    CardHeader
} from '@material-ui/core/'

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing(2)
    }
}))

export default function UserViewFlights() {
    const classes = useStyles()
    const data = [
        { quarter: 1, earnings: 13000 },
        { quarter: 2, earnings: 16500 },
        { quarter: 3, earnings: 14250 },
        { quarter: 4, earnings: 19000 }
    ]
    return (
        <div className={classes.root}>
            <Grid
                container
                spacing={2}
                direction="column"
               //  width={1000}
               // justify="flex-start"
               // alignItems="flex-start"
            >
                {data.map(flight => (
                    <Grid item  key={data.indexOf(flight)}>
                        <Card>
                            <CardHeader
                                title={`quarter : ${flight.quarter}`}
                                subheader={`earnings : ${flight.earnings}`}
                            />
                            <CardContent>
                                <Typography variant="h5" gutterBottom>
                                    Hello World
                                </Typography>
                            </CardContent>
                        </Card>
                     </Grid>
                ))}
            </Grid>
        </div>
    )
}