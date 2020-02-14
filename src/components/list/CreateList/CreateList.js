import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Icon, Grid, Typography } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { ActionDialog, TextField, ComboBox, Message } from '../../ui-kit';
import { ServiceLocatorContext } from '../../context';
import { withApollo } from 'react-apollo';
import { useSnackbar } from 'notistack';
import { setListAction } from '../../../store/actions/listActions';

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
    },
    form: {
        paddingBottom: theme.spacing(8),
        paddingTop: theme.spacing(4),
    }
}));
// Component used to create List for user
const CreateList = ({ translation, user, client, listToState }) => {
    const { enqueueSnackbar } = useSnackbar(); // Notification
    const classes = useStyles();
    const { listService, userService, notificationFactory } = useContext(ServiceLocatorContext);
    // State
    const [open, setOpen] = useState(false);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState('');
    const [users, setUsers] = useState([]);
    const [selectedUsers, setSelectedUser] = useState([]);


    // onInit
    useEffect(() => {
        fetchUsers(); // fetch users to propose suggestions in combobox
    }, []);

    // Fetch all users for the combobox suggestion
    const fetchUsers = async () => {
        try {
            setLoading(true);
            userService._client = client;
            const friends = await userService.fetchAllWithout(user.app_user_id); // Apollo fetch
            setUsers(friends); // State update
        } catch (err) {
            enqueueSnackbar(notificationFactory.buildNotification({ title: translation["FETCH_FRIENDS_ERROR"], err: err.message, variant: 'error' })); // Show error
        } finally {
            setLoading(false);
        }
    };
    // Handle submit dialog
    // It should create a new list item and then redirect to list page
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            listService._client = client; // Setup client
            const newList = await listService.createList({ name, userId: user.app_user_id }); // Graphql create list
            listToState(newList); // Redux update state
        } catch (err) {
            setError(true);
        }
    };

    // Handle input change
    const handleChange = (e, v) => {
        setName(v); // State update
    };

    // When combobox options changes
    const selectedOptionsChanges = (options) => {
        setSelectedUser(options); // State update
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
                submitDisabled={loading || name === ''}
                isOpen={open}
                toggle={() => setOpen(false)}
                onCancel={() => setOpen(false)}
                onSubmit={handleSubmit}>
                {/** Form */}
                <Grid
                    className={classes.form}
                    spacing={1}
                    direction="column"
                    container>
                    <Grid item>
                        <TextField
                            required
                            label={translation["CREATE_LIST_NAME_FIELD"]}
                            name="name"
                            disabled={loading}
                            value={name}
                            onChange={handleChange}
                            fullWidth />
                    </Grid>
                    <Grid item>
                        <ComboBox
                            disabled={loading}
                            label={translation["CREATE_LIST_FRIENDS"]}
                            multi
                            placeholder={translation["CREATE_LIST_FRIENDS_PLACEHOLDER"]}
                            options={users.map(u => { return { value: u.app_user_id, label: u.username } })}
                            update={selectedOptionsChanges} />
                    </Grid>
                    {error &&
                        <Grid item>
                            <Message value={translation["CREATE_LIST_ERROR"]} />
                        </Grid>}
                </Grid>
            </ActionDialog>
        </React.Fragment>
    )
};
CreateList.propTypes = {
    user: PropTypes.shape({
        app_user_id: PropTypes.number,
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
        listToState: (val) => {
            dispatch(setListAction(val))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withApollo(CreateList));