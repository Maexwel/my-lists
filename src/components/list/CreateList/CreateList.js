import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Card, Icon, Grid, Tooltip } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';

// Style def
const useStyles = makeStyles(theme => createStyles({
    root: {
        cursor: 'pointer',
        '&:hover': {
            boxShadow: theme.shadows[6],
        },
        height: 150,
    },
    icon: {
        height: '100%',
    }
}));
// Component used to create List for user
const CreateList = ({ translation, user }) => {
    const classes = useStyles();

    return (
        <Tooltip title="ok" placement="right">
            <Card className={classes.root}>
                <Grid
                    className={classes.icon}
                    container
                    justify="center"
                    alignItems="center">
                    <Grid item>
                        <Icon>add</Icon>
                    </Grid>
                </Grid>
            </Card>
        </Tooltip>
    )
};
CreateList.propTypes = {
    user: PropTypes.shape({

    }),
    translation: PropTypes.object,
};
// // //
// Redux connection
const mapStateToProps = state => ({
    user: state.user, // Current displayed list
    translation: state.lang.translation, // Current location in the app
})

const mapDispatchToProps = dispatch => {
    return {

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CreateList);