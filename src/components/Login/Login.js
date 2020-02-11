import React, { useContext, useState, useEffect } from 'react';
import { ServiceLocatorContext } from '../context';
import PropTypes from 'prop-types';
import { withApollo } from 'react-apollo';
import { TextField, ActionButton, Loading } from '../ui-kit';
import { Grid } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { setUserAction } from '../../store/actions/userActions';
import { Message } from '../ui-kit/feedback';

// Style def
const useStyles = makeStyles(theme => createStyles({
    root: {
        minWidth: 300,
    },
    fullWidth: {
        width: '100%',
    }
}));
// Login component used to log user in to authenticate
// This component also handle login redirection and local storage checking
const Login = ({ client, translation, history, userToState }) => {
    const { loginService, userService, localStorageManager } = useContext(ServiceLocatorContext);
    const classes = useStyles();
    // State
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [passwd, setPasswd] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    // onInit
    useEffect(() => {
        checkStorage(); // session check (user id is stored)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Check local storage to handle login redirection
    const checkStorage = async () => {
        const userInfo = await localStorageManager.getItem(localStorageManager.KEYS.USER_INFO);
        if (userInfo) {
            // User is authentified
        }
    };

    // Handle input change
    const handleChange = (e, v) => {
        const { target } = e;
        switch (target.name) {
            case 'email':
                setEmail(v); // State update
                break;
            case 'passwd':
                setPasswd(v); // State update
                break;
            default: break;
        }
    };

    // Login request func
    // Handle submit requests
    const onSubmit = async (e) => {
        try {
            e.preventDefault();
            setErrorMessage(''); // Reset error message
            setLoading(true); // Start loading
            loginService._client = client; // Setup client
            const { user, auth } = await loginService.login({ email, passwd }); // Login request
            if (auth) {
                userService._client = client;
                const completeUser = await userService.fetchCompleteUser(user.app_user_id); // Fetch complete info
                userToState(completeUser); // Redux user
                history.push('/dashboard'); // Redirect
            } else {
                setErrorMessage(translation["LOGIN_WRONG_CREDENTIALS"]); // Wrong email/password
                setLoading(false);
            }
        } catch (err) {
            // display error to user
            setErrorMessage(translation["LOGIN_ERROR_MESSAGE"]); // Error message
            setLoading(false);
        }
    };

    return (
        < form className={classes.root} onSubmit={onSubmit} >
            <Grid
                container
                justify="space-between"
                alignItems="center"
                direction="column"
                spacing={2}>
                <Grid item className={classes.fullWidth}>
                    <TextField
                        className={classes.fullWidth}
                        name="email"
                        onChange={handleChange}
                        label={translation["LOGIN_EMAIL_FIELD_LABEL"]}
                        value={email}
                        type="email"
                        placeholder="john.doe@gmail.com" />
                </Grid>
                <Grid item className={classes.fullWidth}>
                    <TextField
                        className={classes.fullWidth}
                        name="passwd"
                        onChange={handleChange}
                        label={translation["LOGIN_PASSWORD_FIELD_LABEL"]}
                        value={passwd}
                        type="password"
                        placeholder="" />
                </Grid>
                <Grid
                    item
                    className={classes.fullWidth}>
                    <ActionButton
                        type="submit"
                        className={classes.fullWidth}
                        disabled={loading}
                        label={translation["LOGIN_BUTTON_LABEL"]}
                        onClick={onSubmit} />
                </Grid>
                {errorMessage !== '' ?
                    <Grid item className={classes.fullWidth}>
                        <Message type="error" value={errorMessage} />
                    </Grid> : null}
                {loading &&
                    <Grid item>
                        <Loading />
                    </Grid>}
            </Grid>
        </form >
    );
};
Login.propTypes = {
    client: PropTypes.object, // Graphql client
    translation: PropTypes.object, // Translation from redux
    userToState: PropTypes.func, // Redux func
    history: PropTypes.object, // react-router-dom history
};
// // // 
// Redux connexion
const mapStateToProps = state => ({
    translation: state.lang.translation, // Current translation
});

const mapDispatchToProps = dispatch => {
    return {
        userToState: (val) => {
            dispatch(
                setUserAction(val) // Set user in store
            )
        }
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(withApollo(withRouter(Login)));