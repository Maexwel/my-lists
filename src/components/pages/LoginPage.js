import React from 'react';
import { Login } from '../Login';
import { Version } from '../Version';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

// Style def
const useStyles = makeStyles(theme => createStyles({
    root: {
        height: '100vh',
        background: theme.palette.primary.dark,
    }
}))
// Login page
const LoginPage = () => {
    const classes = useStyles();

    return (
        <Grid
            container
            justify="center"
            alignItems="center"
            className={classes.root}>
            {/** Login component */}
            <Grid item>
                <Login />
            </Grid>
            {/** Version infos */}
            <Grid item>
                <Version />
            </Grid>
        </Grid>
    );
};
export default LoginPage;