import React, { useContext, useEffect } from 'react';
import { ServiceLocatorContext } from '../context';
import { withApollo } from 'react-apollo';

// Base page of the app
// display the dashboard (lists, archive, ...)
const DashboardPage = ({ client }) => {
    const { loginService } = useContext(ServiceLocatorContext);

    useEffect(() => {
        try {
            loginService._client = client;
            loginService.login({ email: 'test', passwd: 'test' });

        } catch (err) {

        }
    }, []);
    return (
        <div></div>
    )
}
export default withApollo(DashboardPage);