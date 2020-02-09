import React, { useContext, useState } from 'react';
import { ServiceLocatorContext } from '../context';
import PropTypes from 'prop-types';
import { withApollo } from 'react-apollo';
import { TextField, ActionButton } from '../ui-kit';
import { Grid } from '@material-ui/core';

// Login component used to log user in to authenticate
const Login = ({ client }) => {
    const { loginService } = useContext(ServiceLocatorContext);
    // State
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [passwd, setPasswd] = useState('');

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
            e.stopPropagation();
            setLoading(true); // Start loading
            loginService._client = client; // Setup client
            const response = await loginService.login({ email, passwd }); // Login request
        } catch (err) {
            // display error to user
        } finally {
            setLoading(false);
        }
    };

    return (
        <React.Fragment>
            <form onSubmit={onsubmit}>
                <Grid
                    container
                    justify="space-between"
                    alignItems="center"
                    direction="column">
                    <Grid item>
                        <TextField
                            name="email"
                            onChange={handleChange}
                            label=""
                            value={email}
                            type="email"
                            placeholder="john.doe@gmail.com" />
                    </Grid>
                    <Grid item>
                        <TextField
                            name="passwd"
                            onChange={handleChange}
                            label=""
                            value={passwd}
                            type="password"
                            placeholder="" />
                    </Grid>
                    <Grid item>
                        <ActionButton
                            color="primary"
                            disabled={loading}
                            label="test"
                            onClick={onSubmit} />
                    </Grid>
                </Grid>
            </form>
        </React.Fragment>
    );

};
Login.propTypes = {
    client: PropTypes.object, // Graphql client
    translation: PropTypes.object, // Translation from redux
};
export default withApollo(Login);