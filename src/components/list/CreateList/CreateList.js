import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Icon, Grid, Typography } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { ActionDialog } from '../../ui-kit';
import { ServiceLocatorContext } from '../../context';
import { withApollo } from 'react-apollo';

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
const CreateList = ({ translation, user, client }) => {
    const classes = useStyles();
    const { listService } = useContext(ServiceLocatorContext);
    // State
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    // Handle submit dialog
    // It should create a new list item and then redirect to list page
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            listService._client = client; // Setup client
            const newList = await listService.createList({}); // Graphql create list

        } catch (err) {

        }
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
                        <Typography className={classes.text}>{translation["CREATE_LIST_BUTTON"]}</Typography>
                    </Grid>
                    <Grid item>
                        <Icon>add</Icon>
                    </Grid>
                </Grid>
            </Button>
            {/** Dialog */}
            <ActionDialog
                title={translation["CREATE_LIST_DIALOG_TITLE"]}
                cancelLabel={translation["CREATE_LIST_DIALOG_CANCEL"]}
                submitLabel={translation["CREATE_LIST_DIALOG_SUBMIT"]}
                submitDisabled={loading}
                isOpen={open}
                toggle={() => setOpen(false)}
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
    client: PropTypes.object, // Graphql client
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
export default connect(mapStateToProps, mapDispatchToProps)(withApollo(CreateList));