import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Icon, Grid, Typography } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { ActionDialog } from '../../ui-kit';

// Style def
const useStyles = makeStyles(theme => createStyles({
    button: {
        '&:hover': {
            boxShadow: theme.shadows[6],
            color: theme.palette.primary.main,
        },
        background: theme.palette.common.white,
        height: 150,
        width: '100%',
    },
    content: {
        height: '100%',
    },
    text: {
        fontWeight: 'bold',
    }
}));
// Component used to create List for user
const CreateList = ({ translation, user }) => {
    const classes = useStyles();
    // State
    const [open, setOpen] = useState(false);

    // Handle submit dialog
    // It should create a new list item and then redirect to list page
    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <React.Fragment>
            {/** Button */}
            <Button
                variant="contained"
                className={classes.button}
                onClick={() => setOpen(true)}>
                <Grid
                    className={classes.content}
                    container
                    direction="column"
                    justify="center"
                    alignItems="center">
                    <Grid item>
                        <Typography className={classes.text}>Create</Typography>
                    </Grid>
                    <Grid item>
                        <Icon>add</Icon>
                    </Grid>
                </Grid>
            </Button>
            {/** Dialog */}
            <ActionDialog
                isOpen={open}
                toggle={setOpen}
                onCancel={() => setOpen(false)}
                onSubmit={handleSubmit}>
                {/** Form */}
            </ActionDialog>
        </React.Fragment>
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