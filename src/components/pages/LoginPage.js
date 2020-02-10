import React from 'react';
import { Login } from '../Login';
import { Version } from '../Version';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Grid, Card, CardHeader, CardContent } from '@material-ui/core';
import { connect } from 'react-redux';

// Style def
const useStyles = makeStyles(theme => createStyles({
    root: {
        height: '100vh',
        background: theme.palette.secondary.main,
        margin: 0,
        padding: 0,
    },
    form: {
        paddingRight: theme.spacing(6),
        paddingLeft: theme.spacing(6),
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    title: {
        fontSize: 35,
        fontWeight: 'bold',
        background: theme.palette.grey[200],
        textAlign: 'center',
    },
    version: {
        width: '100%',
        display: 'block',
        padding: theme.spacing(1),
        fontSize: 12,
        background: theme.palette.grey[200],
        textAlign: 'center',
    }
}))
// Login page
const LoginPage = ({ translation }) => {
    const classes = useStyles();

    return (
        <Grid
            container
            spacing={1}
            justify="center"
            direction="column"
            alignItems="center"
            className={classes.root}>
            {/** Login component */}
            <Grid item>
                <Card>
                    {/** TITLE */}
                    <CardHeader className={classes.title} title={translation["APP_TITLE"]} />
                    {/** FORM */}
                    <CardContent className={classes.form}>
                        <Login />
                    </CardContent>
                    <Version className={classes.version} />
                </Card>
            </Grid>
            {/** Version infos */}
            <Grid item>
            </Grid>
        </Grid>
    );
};
// // // 
// Redux connexion
const mapStateToProps = state => ({
    translation: state.lang.translation, // Current location in the app
})

const mapDispatchToProps = dispatch => {
    return {
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);